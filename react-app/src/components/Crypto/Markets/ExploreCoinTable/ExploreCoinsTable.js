import ExploreCoinCard from "../ExploreCoinCard/ExploreCoinCard";
import "./ExploreCoinsTable.css"

const ExploreCoinsTable = ({ coins }) => {
  return (
    <table>
      <thead style={{textAlign: "left", padding: "10px"}}>
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
      <tbody>
        {coins.map((coin) => (
          <ExploreCoinCard coin={coin} key={coin.id} />
        ))}
      </tbody>
    </table>
  );
};

export default ExploreCoinsTable;
