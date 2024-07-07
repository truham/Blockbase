import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../layout";
import { getCoin } from "../../services/coinService";

interface Coin {
  id: string;
  name: string;
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
  };
}

const CoinDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [coin, setCoin] = useState<Coin | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCoin = async () => {
        try {
          const coinData = await getCoin(id as string);
          setCoin(coinData);
        } catch (error) {
          console.error("Error fetching coin data:", error);
        }
      };
      fetchCoin();
    }
  }, [id]);

  if (!coin) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500">{coin.name}</h1>
        <img
          src={coin.image.large}
          alt={coin.name}
          className="w-32 h-32 mx-auto"
        />
        <p className="mt-4 text-lg text-gray-700">{coin.description.en}</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Market Data</h2>
          <p className="text-gray-500">
            Price: ${coin.market_data.current_price.usd.toLocaleString()}
          </p>
          <p className="text-gray-500">
            Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
          </p>
          <p className="text-gray-500">
            Total Volume: ${coin.market_data.total_volume.usd.toLocaleString()}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CoinDetail;
