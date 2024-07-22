import React from "react";
import Link from "next/link";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useRouter } from "next/router";
import { Coin } from "../types";

interface FeaturedCardsProps {
  coins: Coin[];
}

const FeaturedCards: React.FC<FeaturedCardsProps> = ({ coins }) => {
  const router = useRouter();

  return (
    <div className="bg-[#2f3a58] py-16 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 md:flex md:items-center md:justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Explore crypto like Bitcoin, Ethereum, and Dogecoin
          </h2>
          <p className="text-lg text-white mb-4">
            Simply and securely buy, sell, and manage hundreds of
            cryptocurrencies.
          </p>
          <button
            className="px-4 py-2 bg-[#485986] text-white rounded hover:bg-[#232c42]"
            onClick={() => router.push("/cryptocurrencies/all-coins")}
          >
            See more assets
          </button>
        </div>
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:pl-8">
          {coins.slice(0, 6).map((coin) => (
            <Link
              key={coin.id}
              href={`/cryptocurrencies/coin/${coin.id}`}
              legacyBehavior
            >
              <a className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center space-y-2 cursor-pointer hover:shadow-lg transition-shadow duration-200">
                <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                <h3 className="text-lg font-bold text-gray-900">
                  {coin.name ?? "Name not available"}
                </h3>
                <p className="text-gray-500">
                  {coin.current_price !== undefined
                    ? `$${coin.current_price.toLocaleString()}`
                    : "Price not available"}
                </p>
                <div className="flex items-center space-x-1">
                  {coin.price_change_percentage_24h !== undefined &&
                    (coin.price_change_percentage_24h < 0 ? (
                      <AiOutlineArrowDown className="text-red-500" />
                    ) : (
                      <AiOutlineArrowUp className="text-green-500" />
                    ))}
                  <p
                    className={
                      coin.price_change_percentage_24h !== undefined
                        ? coin.price_change_percentage_24h < 0
                          ? "text-red-500"
                          : "text-green-500"
                        : "text-gray-500"
                    }
                  >
                    {coin.price_change_percentage_24h !== undefined
                      ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                      : "Change not available"}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCards;
