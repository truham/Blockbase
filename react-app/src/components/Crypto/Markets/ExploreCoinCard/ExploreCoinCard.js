import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import "./ExploreCoinCard.css";

const ExploreCoinCard = ({ coin }) => {
  const numCoverter = (num) => {
    if (num === null || num === undefined) {
      return "N/A";
    }

    let newNum;

    if (num >= 1_000_000_000_000) {
      newNum = (num / 1_000_000_000_000).toFixed(1) + "T";
    } else if (num >= 1_000_000_000) {
      newNum = (num / 1_000_000_000).toFixed(1) + "B";
    } else if (num >= 1_000_000) {
      newNum = (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 100_000) {
      newNum = (num / 100_000).toFixed(1) + "K";
    } else {
      newNum = num.toFixed(1);
    }

    return newNum;
  };

  return (
    <tr>
      <td className="explore-coin-card-name-container">
        <img
          style={{ height: "35px", marginRight: "10px" }}
          src={coin.image}
          alt={coin.name}
        ></img>
        <div className="explore-coin-card-name">
          <span style={{ fontWeight: "bold" }}>{coin.name}</span>
          <span>{`(${coin.symbol.toUpperCase()})`}</span>
        </div>
      </td>
      <td>{`$${coin.current_price.toFixed(2)}`}</td>
      <td>Temp Chart</td>
      <td>
        {coin.price_change_percentage_24h < 0 ? (
          <span className="explore-coin-card-down">
            <BsArrowDownRight />
            {`${coin.price_change_percentage_24h.toFixed(2)}%`}
          </span>
        ) : (
          <span className="explore-coin-card-up">
            <BsArrowUpRight />
            {`${coin.price_change_percentage_24h.toFixed(2)}%`}
          </span>
        )}
      </td>
      <td>{`${numCoverter(coin.market_cap)}`}</td>
      <td>{`${numCoverter(coin.total_volume)}`}</td>
      <td>{`${numCoverter(coin.total_supply)}`}</td>
    </tr>
  );
};

export default ExploreCoinCard;
