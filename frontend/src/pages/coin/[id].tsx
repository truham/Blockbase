import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Layout from "../../layout";
import { getCoin, getCoinHistory } from "../../services/coinService";
import CoinChart from "../../components/CoinChart";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
}

interface ChartData {
  date: string;
  price: number;
}

const CoinDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [coin, setCoin] = useState<Coin | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoinData = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const coinData = await getCoin(id as string);
        setCoin(coinData);

        const historyData = await getCoinHistory(id as string);
        const formattedData = historyData.prices.map(
          (entry: [number, number]) => ({
            date: new Date(entry[0]).toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            price: entry[1],
          })
        );
        setChartData(formattedData);
      } catch (error) {
        setError("Error fetching coin data. Please try again later.");
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchCoinData();
  }, [fetchCoinData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!coin) return <div>Coin data not found.</div>;

  return (
    <Layout>
      <div className="flex justify-center p-5">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img className="h-8 w-8" src={coin.image.small} alt={coin.name} />
              <span className="font-bold mx-2">{coin.name}</span>
              <span className="uppercase">{coin.symbol}</span>
            </div>
            <div>
              <span>{`$${coin.market_data.current_price.usd}`}</span>
              {coin.market_data.price_change_percentage_24h < 0 ? (
                <span className="text-red-500 flex items-center">
                  <AiOutlineArrowDown />
                  {`${coin.market_data.price_change_percentage_24h.toFixed(
                    2
                  )}%`}
                </span>
              ) : (
                <span className="text-green-500 flex items-center">
                  <AiOutlineArrowUp />
                  {`${coin.market_data.price_change_percentage_24h.toFixed(
                    2
                  )}%`}
                </span>
              )}
            </div>
          </div>
          <div className="mb-6 w-full">
            <CoinChart data={chartData} />
          </div>
          <div>
            <p
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            ></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoinDetail;
