import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../layout";
import { fetchCoinDetails, fetchCoinHistory } from "../../store/coinSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CoinChart from "../../components/CoinChart";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { CoinDetail, CoinHistory } from "../../types";

interface ChartData {
  date: string;
  price: number;
}

const CoinDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { coinDetails, coinHistory, loading, error } = useAppSelector(
    (state) => state.coins
  );
  const coin: CoinDetail | undefined = coinDetails[id as string];
  const history: CoinHistory | undefined = coinHistory[id as string];
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCoinDetails(id as string));
      dispatch(fetchCoinHistory(id as string));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (history) {
      const formattedData: ChartData[] = history.prices.map(
        (entry: [number, number]) => ({
          date: new Date(entry[0]).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: entry[1],
        })
      );
      setChartData(formattedData);
    }
  }, [history]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;
  if (!coin) return <span>Coin data not found.</span>;

  return (
    <Layout>
      <div className="flex justify-center p-5">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img className="h-8 w-8" src={coin.image.large} alt={coin.name} />
              <span className="font-bold mx-2">{coin.name}</span>
              <span className="uppercase">{coin.symbol}</span>
            </div>
            <div>
              <span>{`$${coin.market_data.current_price.usd}`}</span>
              {coin.market_data.price_change_percentage_24h !== undefined &&
                (coin.market_data.price_change_percentage_24h < 0 ? (
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
                ))}
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

export default CoinDetailPage;
