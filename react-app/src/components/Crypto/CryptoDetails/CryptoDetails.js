import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoinDetailsThunk } from "../../../store/coins";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Charts from "../Charts/Charts";
import "./CryptoDetails.css";

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.coins.coin);
  const error = useSelector((state) => state.coins.error);
  const { coinId } = useParams();

  useEffect(() => {
    dispatch(getCoinDetailsThunk(coinId));
  }, [dispatch, coinId]);

  if (!coin) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.error}</span>;
  }

  return (
    <div className="crypto-details-outer">
      <div className="crypto-details-container">
        <div className="crypto-details-top-section">
          <span>{`Rank #${coin.coingecko_rank}`}</span>
          <div className="crypto-details-img-name-symbol">
            <img
              style={{ height: "30px", width: "30px" }}
              src={coin.image.small}
              alt={coin.name}
            ></img>
            <span style={{ fontWeight: "bold", margin: "0 0.5rem" }}>
              {coin.name}
            </span>
            <span>{`${coin.symbol.toUpperCase()}`}</span>
          </div>
          <div>
            <span>{`$${coin.market_data.current_price.usd}`}</span>
            {coin.market_data.price_change_percentage_24h < 0 ? (
              <span className="crypto-details-price-down">
                <AiOutlineArrowDown />
                {`${coin.market_data.price_change_percentage_24h.toFixed(2)}%`}
              </span>
            ) : (
              <span className="crypto-details-price-up">
                <AiOutlineArrowUp />
                {`${coin.market_data.price_change_percentage_24h.toFixed(2)}%`}
              </span>
            )}
          </div>
        </div>
        <Charts coinId={coinId} />
        <div>
          <p dangerouslySetInnerHTML={{ __html: coin.description.en }}></p>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
