import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExploreThunk } from "../../../store/coins";
import ExploreCoinsTable from "./ExploreCoinTable/ExploreCoinsTable";
import "./Markets.css";
import "./MarketsPagination.css";

const Markets = () => {
  const dispatch = useDispatch();
  const exploreCoins = useSelector((state) => state.coins.coins);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // begin at page 1
  const coinsPerPage = 10; // limit how many coins to show per page

  // calc start & end indices for coins slice array
  const endIndex = currentPage * coinsPerPage;
  const startIndex = endIndex - coinsPerPage;
  const coinsDisplay = exploreCoins?.slice(startIndex, endIndex);

  // calc total # of pages
  const totalPages = Math.ceil(exploreCoins?.length / coinsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle prev & next options
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <ExploreCoinsTable coins={coinsDisplay} />
      {/* Pagination buttons */}
      <div className="markets-pagination-container">
        {/* Handle previous */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="markets-pagination-buttons"
        >
          &lt; Prev
        </button>

        {/* Handle page display */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className="markets-pagination-buttons"
          >
            {index + 1}
          </button>
        ))}

        {/* Handle next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="markets-pagination-buttons"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Markets;
