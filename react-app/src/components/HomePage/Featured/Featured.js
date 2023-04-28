import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { getFeaturedThunk } from "../../../store/coins";

const Featured = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const featured = useSelector((state) => state.coins.featured);

  useEffect(() => {
    const getFeatured = async () => {
      await dispatch(getFeaturedThunk());
    };
    getFeatured();
  }, [dispatch]);

  const handleSeeAssets = () => {
    history.push("/cryptocurrencies");
  };

  const handleDetailsDirect = (coin) => {
    history.push(`/cryptocurrencies/${coin.id}`);
  };

  if (!featured) {
    return <span>Loading...</span>;
  }

  return (
    <div className="bg-[#2f3a58] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex items-center">
          <div className="space-y-4">
            <p className="text-2xl font-bold text-white">
              Explore crypto like Bitcoin, Ethereum, and Dogecoin
            </p>
            <p className="text-lg text-white">
              View all available cryptocurrencies
            </p>
            <button
              onClick={handleSeeAssets}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-[#485986] border-gray-300 rounded-lg hover:bg-[#232c42]"
            >
              See more assets
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map((coin, idx) => (
              <div
                className="rounded-lg shadow-md p-4 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200"
                key={idx}
                onClick={(e) => handleDetailsDirect(coin)}
              >
                <div className="w-10 h-10">
                  <img
                    className="w-full h-full object-cover"
                    src={coin.image}
                    alt={coin.name}
                  ></img>
                </div>
                <div className="mt-2">
                  <h4 className="font-bold">{coin.name}</h4>
                  <span>{`$${coin.current_price.toFixed(2)}`}</span>
                </div>
                {coin.price_change_percentage_24h < 0 ? (
                  <span className="text-red-600 flex flex-row items-center mt-2">
                    <AiOutlineArrowDown />
                    {`${coin.price_change_percentage_24h.toFixed(2)}%`}
                  </span>
                ) : (
                  <span className="text-green-600 flex flex-row items-center mt-2">
                    <AiOutlineArrowUp />
                    {`${coin.price_change_percentage_24h.toFixed(2)}%`}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
