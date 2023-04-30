import ExploreCoinCard from "../ExploreCoinCard/ExploreCoinCard";
import "./ExploreCoinsTable.css";

const ExploreCoinsTable = ({ coins }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="explore-coins-table-head-row">
            <th>Name</th>
            <th>Price</th>
            <th>Chart</th>
            {/* <th>Change</th> */}
            <th>Market Cap</th>
            <th>Total Volume</th>
            <th>Total Supply</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {coins.map((coin) => (
            <ExploreCoinCard coin={coin} key={coin.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExploreCoinsTable;
