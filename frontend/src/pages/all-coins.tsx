// src/pages/all-coins.tsx

import { useEffect } from "react";
import Layout from "../layout";
import { fetchCoins } from "../store/coinSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Link from "next/link";
import { Coin } from "../types";

const AllCoins = () => {
  const dispatch = useAppDispatch();
  const { coins, loading, error } = useAppSelector((state) => state.coins);

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500">
          All Cryptocurrencies
        </h1>
        <ul className="mt-8 space-y-4">
          {coins.map((coin: Coin) => (
            <li key={coin.id} className="p-4 bg-white rounded shadow">
              <Link href={`/coin/${coin.id}`}>
                <div className="flex items-center space-x-4">
                  <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                  <div>
                    <h3 className="text-lg font-bold">{coin.name}</h3>
                    <p className="text-gray-500">
                      {coin.current_price !== undefined
                        ? `$${coin.current_price.toLocaleString()}`
                        : "Price not available"}
                    </p>
                    <p className="text-gray-500">
                      {coin.market_cap !== undefined
                        ? `Market Cap: $${coin.market_cap.toLocaleString()}`
                        : "Market Cap not available"}
                    </p>
                    <p className="text-gray-500">
                      Rank: {coin.market_cap_rank ?? "Not available"}
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
