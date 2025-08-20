import { useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../src/layout";
import { fetchCoins } from "../src/store/coinSlice";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import HeroGM from "../src/components/HeroGM";
import FeaturedCards from "../src/components/FeaturedCards";
import HeroMemes from "../src/components/HeroMemes";

interface HomeProps {
  fallback?: boolean;
}

const Home = ({ fallback }: HomeProps) => {
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
      <HeroMemes />
      <FeaturedCards coins={coins} />
    </Layout>
  );
};

// Enable static generation for the homepage
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      fallback: true,
    },
    // Revalidate every hour to keep data fresh
    revalidate: 3600,
  };
};

export default Home;
