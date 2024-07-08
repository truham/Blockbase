import { useEffect, useState } from "react";
import Layout from "../layout";
import { getCoins } from "../services/coinService";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const coinData = await getCoins(5); // Fetch only the top 5 coins
        setCoins(coinData);
      } catch (error) {
        setError("Error fetching coins. Please try again later.");
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleViewAll = () => {
    router.push("/all-coins");
  };

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
          <ul className="mt-4 space-y-4">
            {coins.map((coin) => (
              <li key={coin.id} className="p-4 bg-white rounded shadow">
                <Link href={`/coin/${coin.id}`}>
                  <div className="flex items-center space-x-4">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-12 h-12"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{coin.name}</h3>
                      <p className="text-gray-500">
                        ${coin.current_price.toLocaleString()}
                      </p>
                      <p className="text-gray-500">
                        Market Cap: ${coin.market_cap.toLocaleString()}
                      </p>
                      <p className="text-gray-500">
                        Rank: {coin.market_cap_rank}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={handleViewAll}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          >
            View All Cryptocurrencies
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
