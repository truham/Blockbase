import { useEffect, useState } from "react";
import Layout from "../layout";
import { fetchCoins } from "../store/coinSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ExploreCoinsTable from "../components/ExploreCoinsTable";
import { Coin } from "../types";

const AllCoins = () => {
  const dispatch = useAppDispatch();
  const exploreCoins: Coin[] = useAppSelector((state) => state.coins.coins);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coinsPerPage = 7;

  // Calculate start and end indices for the current page
  const endIndex = currentPage * coinsPerPage;
  const startIndex = endIndex - coinsPerPage;
  const coinsDisplay = exploreCoins?.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(exploreCoins?.length / coinsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
    dispatch(fetchCoins());
  }, [dispatch]);

  if (!exploreCoins) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-blue-500 mb-4">Crypto Prices</h2>
        <ExploreCoinsTable coins={coinsDisplay} />
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &lt; Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AllCoins;
