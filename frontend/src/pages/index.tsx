import { useEffect, useState } from "react";
import Layout from "../layout";
import { getCoins } from "../services/coinService";
import CoinList from "../components/CoinList";
import Link from "next/link";

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
}

const Home = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const coinData = await getCoins();
      setCoins(coinData.slice(0, 5)); // Display only the top 5 coins
    };
    fetchCoins();
  }, []);

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500">
          Welcome to Next.js with Tailwind CSS!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          This is the home page of your Crypto NFT App.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Top 5 Cryptocurrencies</h2>
          <CoinList coins={coins} />
          <div className="mt-4">
            <Link href="/cryptocurrencies">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View All Cryptocurrencies
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
