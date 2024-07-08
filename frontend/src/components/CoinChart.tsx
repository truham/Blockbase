import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  price: number;
}

interface CoinChartProps {
  data: ChartData[];
}

const CoinChart: React.FC<CoinChartProps> = ({ data }) => {
  // handle granular data for more dynamic chart
  const minPrice = Math.min(...data.map((item) => item.price)) * 0.995;
  const maxPrice = Math.max(...data.map((item) => item.price)) * 1.015;

  // format y-axis price
  const formatY = (val: number) => `$${val.toFixed(2)}`;

  // format tooltip price
  const formatToolTip = (val: number, name: string) => [
    `$${val.toFixed(2)}`,
    name,
  ];

  return (
    <div className="w-full h-96">
      {" "}
      {/* Make the container full width and set a fixed height */}
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
          <XAxis dataKey="date" />
          <YAxis domain={[minPrice, maxPrice]} tickFormatter={formatY} />
          <Tooltip formatter={formatToolTip} />
          <Area
            type="monotone"
            dataKey="price"
            fill="#3182bd"
            stroke="#3182bd"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoinChart;
