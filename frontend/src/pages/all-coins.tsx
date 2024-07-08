import { useEffect, useState } from "react";
import Layout from "../layout";
import { getCoins } from "../services/coinService";
import Link from "next/link";

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
}

const AllCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const coinData = await getCoins(); // Fetch default number of coins
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

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500">
          All Cryptocurrencies
        </h1>
        <ul className="mt-8 space-y-4">
          {coins.map((coin) => (
            <li key={coin.id} className="p-4 bg-white rounded shadow">
              <Link href={`/coin/${coin.id}`}>
                <div className="flex items-center space-x-4">
                  <img src={coin.image} alt={coin.name} className="w-12 h-12" />
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
      </div>
    </Layout>
  );
};

export default AllCoins;
