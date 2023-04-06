import { useEffect } from "react";
import { get24HChartThunk } from "../../../store/charts";
import { useDispatch, useSelector } from "react-redux";
import "./Charts.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ coinId }) => {
  const dispatch = useDispatch();
  const marketData = useSelector((state) => state.charts.chart);

  useEffect(() => {
    dispatch(get24HChartThunk(coinId));
  }, [dispatch, coinId]);

  if (!marketData) {
    return <span>Loading...</span>;
  }

  // handle historical data 24H chart
  const data = marketData.prices.map((values) => {
    const [timestamp, price] = values;

    // round time to 30 minutes
    const dateObj = new Date(timestamp);
    const minutes = dateObj.getMinutes();
    const roundedMinutes = Math.round(minutes / 30) * 30;
    dateObj.setMinutes(roundedMinutes);

    // set date val to specific time with only hour and minute options
    const date = dateObj.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      Date: date,
      Price: price,
    };
  });

  // handle granular data for more dynamic chart
  const minPrice = Math.min(...data.map((item) => item.Price)) * 0.995;
  const maxPrice = Math.min(...data.map((item) => item.Price)) * 1.015;

  // format y-axis price
  const formatY = (val) => {
    return `$${val.toFixed(2)}`;
  };

  // format tooltip price
  const formatToolTip = (val, name) => {
    return [`$${val.toFixed(2)}`, name];
  };

  return (
    <div className="charts-container">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 30,
            bottom: 30,
          }}
        >
          <XAxis dataKey="Date" interval={30} />
          <YAxis domain={[minPrice, maxPrice]} tickFormatter={formatY} />
          <Tooltip formatter={formatToolTip} />
          <Area
            type="monotone"
            dataKey="Price"
            stroke="#344afb"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
