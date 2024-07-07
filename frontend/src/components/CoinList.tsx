import React from "react";
import Link from "next/link";

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
}

interface CoinListProps {
  coins: Coin[];
}

const CoinList: React.FC<CoinListProps> = ({ coins }) => {
  return (
    <ul className="mt-4 space-y-4">
      {coins.map((coin) => (
        <li key={coin.id} className="p-4 bg-white rounded shadow">
          <div className="flex items-center space-x-4">
            <img src={coin.image} alt={coin.name} className="w-12 h-12" />
            <div>
              <Link href={`/coin/${coin.id}`}>
                <h3 className="text-lg font-bold cursor-pointer text-blue-500 hover:underline">
                  {coin.name}
                </h3>
              </Link>
              <p className="text-gray-500">
                ${coin.current_price.toLocaleString()}
              </p>
              <p className="text-gray-500">
                Market Cap: ${coin.market_cap.toLocaleString()}
              </p>
              <p className="text-gray-500">Rank: {coin.market_cap_rank}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CoinList;
