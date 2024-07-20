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
    dispatch(fetchAllCoins({ page: 1, perPage: 100 }));
  }, [dispatch]);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = allCoins.slice(indexOfFirstCoin, indexOfLastCoin);
  const totalPages = Math.ceil(allCoins.length / coinsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div>
        <h1 className="py-4 text-4xl font-bold text-blue-500">
          Cryptocurrencies
        </h1>
        <ExploreCoinsTable coins={currentCoins} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
};

export default AllCoins;
