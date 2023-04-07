import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { getFeaturedThunk } from "../../store/coins";
import "./Featured.css";

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
    <div className="featured-outer">
      <div className="featured-container">
        <div className="featured-left">
          <h1>Explore crypto like Bitcoin, Ethereum, and Dogecoin</h1>
          <h2>View all available assets: Cryptocurrencies</h2>
          <button onClick={handleSeeAssets}>See more assets</button>
        </div>

        <div className="featured-right">
          {featured.map((coin, idx) => (
            <div
              className="featured-card-container"
              key={idx}
              onClick={(e) => handleDetailsDirect(coin)}
            >
              <div>
                <img
                  className="featured-card-img"
                  src={coin.image}
                  alt={coin.name}
                ></img>
              </div>
              <div>
                <h4>{coin.name}</h4>
                <span>{`$${coin.current_price.toFixed(2)}`}</span>
              </div>
              {coin.price_change_percentage_24h < 0 ? (
                <span className="featured-card-down">
                  <AiOutlineArrowDown />
                  {`${coin.price_change_percentage_24h.toFixed(2)}%`}
                </span>
              ) : (
                <span className="featured-card-up">
                  <AiOutlineArrowUp />
                  {`${coin.price_change_percentage_24h.toFixed(2)}%`}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
