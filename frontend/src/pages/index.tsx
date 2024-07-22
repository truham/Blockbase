import { useEffect } from "react";
import Layout from "../layout";
import { fetchCoins } from "../store/coinSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import HeroGM from "../components/HeroGM";
import FeaturedCards from "../components/FeaturedCards";

const Home = () => {
  const dispatch = useAppDispatch();
  const { coins, loading, error } = useAppSelector((state) => state.coins);

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <HeroGM />
      <FeaturedCards coins={coins} />
    </Layout>
  );
};

export default Home;
