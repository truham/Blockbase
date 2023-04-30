// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import "./ExploreCoinCard.css";
// import { get24HChartThunk } from "../../../../store/charts";
// import ECCChart from "../ExploreCoinCardChart/ExploreCoinCardChart";

const ExploreCoinCard = ({ coin }) => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const marketData = useSelector((state) => state.charts.charts[coin.id]);

  // useEffect(() => {
  //   dispatch(get24HChartThunk(coin.id));
  // }, [dispatch, coin.id]);

  // handle historical data 24H chart - pass to ECCChart for rendering
  // const historicalData = marketData?.prices.map((values) => {
  //   const [timestamp, price] = values;

  //   const dateObj = new Date(timestamp);
  //   const date = dateObj.toLocaleDateString();

  //   return {
  //     Date: date,
  //     Price: price,
  //   };
  // });

  // number converter for chart display
  const numCoverter = (num) => {
    if (num === null || num === undefined) {
      return "-";
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

  // redirect user to specific coin's details
  const handleDetailsDirect = () => {
    history.push(`/cryptocurrencies/${coin.id}`);
  };

  // if (!marketData) {
  //   return <span>Loading...</span>;
  // }

  return (
    <tr
      className="explore-coin-card-container"
      style={{ cursor: "pointer" }}
      onClick={handleDetailsDirect}
    >
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
      {/* <td>
        <ECCChart historicalData={historicalData} />
      </td> */}
      <td>
        {coin.price_change_percentage_24h < 0 ? (
          <span className="explore-coin-card-down flex">
            <BsArrowDownRight className="mr-2" />
            {`${coin.price_change_percentage_24h.toFixed(2)}%`}
          </span>
        ) : (
          <span className="explore-coin-card-up flex">
            <BsArrowUpRight className="mr-2" />
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
