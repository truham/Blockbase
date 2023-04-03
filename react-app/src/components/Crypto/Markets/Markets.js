import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExploreThunk } from "../../../store/coins";
import ExploreCoinsTable from "./ExploreCoinTable/ExploreCoinsTable";
import "./Markets.css";

const Markets = () => {
  const dispatch = useDispatch();
  const exploreCoins = useSelector((state) => state.coins.coins);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getExploreCoins = async () => {
      await dispatch(getExploreThunk());
    };
    getExploreCoins();
  }, [dispatch]);

  if (!exploreCoins) return null;

  return (
    <div className="markets-container">
      <h2>Crypto Prices</h2>
      <ExploreCoinsTable coins={exploreCoins} />
    </div>
  );
};

export default Markets;
