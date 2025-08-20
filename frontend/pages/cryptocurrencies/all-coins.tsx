import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../../src/layout";
import { fetchAllCoins } from "../../src/store/coinSlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import ExploreCoinsTable from "../../src/components/ExploreCoinsTable";
import Pagination from "../../src/components/Pagination";

interface AllCoinsProps {
  fallback?: boolean;
}

const AllCoins = ({ fallback }: AllCoinsProps) => {
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
      <div className="bg-gray-100 py-8 w-full">
        <div className="max-w-screen-xl mx-auto px-4">
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
      </div>
    </Layout>
  );
};

// Enable static generation
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      fallback: true,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default AllCoins;
