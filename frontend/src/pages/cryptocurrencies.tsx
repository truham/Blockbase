import { useEffect, useState } from "react";
import Layout from "../layout";
import { getCoins } from "../services/coinService";
import CoinList from "../components/CoinList";

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
}

const Cryptocurrencies = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const coinData = await getCoins();
      setCoins(coinData);
    };
    fetchCoins();
  }, []);

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500">
          All Cryptocurrencies
        </h1>
        <CoinList coins={coins} />
      </div>
    </Layout>
  );
};

export default Cryptocurrencies;
