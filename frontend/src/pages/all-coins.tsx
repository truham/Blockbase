import { useEffect, useState } from "react";
import Layout from "../layout";
import { fetchAllCoins } from "../store/coinSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ExploreCoinsTable from "../components/ExploreCoinsTable";
import Pagination from "../components/Pagination";

const AllCoins = () => {
  const dispatch = useAppDispatch();
  const { allCoins, loading, error } = useAppSelector((state) => state.coins);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllCoins({ page: currentPage, perPage: coinsPerPage }));
  }, [dispatch, currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500">
          All Cryptocurrencies
        </h1>
        <ExploreCoinsTable coins={allCoins} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allCoins.length / coinsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
};

export default AllCoins;
