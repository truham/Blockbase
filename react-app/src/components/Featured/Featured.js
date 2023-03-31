import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { getFeaturedThunk } from "../../store/coins";
import "./Featured.css";

const Featured = () => {
  const dispatch = useDispatch();
  const featured = useSelector((state) => state.coins.featured);

  useEffect(() => {
    const getFeatured = async () => {
      await dispatch(getFeaturedThunk());
    };
    getFeatured();
  }, [dispatch]);

  if (!featured) return null;

  return (
    <div className="featured-outer">
      <div className="featured-container">
        <div className="featured-left">
          <h3>Explore crypto like Bitcoin, Ethereum, and Dogecoin</h3>
          <p>View all available assets: cryptocurrencies and NFTs</p>
          <button>See more assets</button>
        </div>

        <div className="featured-right">
          {featured.map((coin, idx) => (
            <div className="featured-card-container" key={idx}>
              <div>
                <img
                  className="featured-card-img"
                  src={coin.image}
                  alt=""
                ></img>
              </div>
              <div>
                <h4>{coin.name}</h4>
                <span>{`$${coin.current_price}`}</span>
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
