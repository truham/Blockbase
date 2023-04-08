import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ExploreCoinCardChart.css";

const ECCC = ({ historicalData }) => {
  return (
    <div className="ECC-chart-container">
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={historicalData}>
          <XAxis dataKey="Date" hide />
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Price"
            stroke="#3182bd"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ECCC;
