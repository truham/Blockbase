import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../layout";
import { fetchCoinDetails, fetchCoinHistory } from "../../../store/coinSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import CoinChart from "../../../components/CoinChart";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { CoinDetail, CoinHistory } from "../../../types";
import { FaGlobe, FaFileAlt, FaSearch, FaGithub } from "react-icons/fa";

interface ChartData {
  date: string;
  price: number;
}

const CoinDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { coinDetails, coinHistory, loading, error } = useAppSelector(
    (state) => state.coins
  );
  const coin: CoinDetail | undefined = coinDetails[id as string];
  const history: CoinHistory | undefined = coinHistory[id as string];
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCoinDetails(id as string));
      dispatch(fetchCoinHistory(id as string));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (history) {
      const formattedData: ChartData[] = history.prices.map(
        (entry: [number, number]) => ({
          date: new Date(entry[0]).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: entry[1],
        })
      );
      setChartData(formattedData);
    }
  }, [history]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;
  if (!coin) return <span>Coin data not found.</span>;

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : coin ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center p-5">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
              <button
                onClick={() => router.back()}
                className="mb-4 flex items-center text-blue-500 hover:underline"
              >
                <AiOutlineArrowLeft className="mr-2" /> Back
              </button>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8"
                    src={coin.image.large}
                    alt={coin.name}
                  />
                  <span className="font-bold mx-2">{coin.name}</span>
                  <span className="uppercase">{coin.symbol}</span>
                </div>
                <div>
                  <span>{`$${coin.market_data.current_price.usd}`}</span>
                  {coin.market_data.price_change_percentage_24h !== undefined &&
                    (coin.market_data.price_change_percentage_24h < 0 ? (
                      <span className="text-red-500 flex items-center">
                        <AiOutlineArrowDown />
                        {`${coin.market_data.price_change_percentage_24h.toFixed(
                          2
                        )}%`}
                      </span>
                    ) : (
                      <span className="text-green-500 flex items-center">
                        <AiOutlineArrowUp />
                        {`${coin.market_data.price_change_percentage_24h.toFixed(
                          2
                        )}%`}
                      </span>
                    ))}
                </div>
              </div>
              <div className="mb-6 w-full">
                <CoinChart data={chartData} />
              </div>
              <div>
                <p
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: coin.description.en }}
                ></p>
              </div>

              {/* New Links Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coin.links.homepage[0] && (
                    <a
                      href={coin.links.homepage[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                    >
                      <FaGlobe />
                      <span>Homepage</span>
                    </a>
                  )}
                  {coin.links.whitepaper && (
                    <a
                      href={coin.links.whitepaper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                    >
                      <FaFileAlt />
                      <span>Whitepaper</span>
                    </a>
                  )}
                </div>

                {coin.links.blockchain_site &&
                  coin.links.blockchain_site.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Blockchain Explorers
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {coin.links.blockchain_site.slice(0, 3).map(
                          (site, index) =>
                            site && (
                              <a
                                key={index}
                                href={site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                              >
                                <FaSearch />
                                <span>Explorer {index + 1}</span>
                              </a>
                            )
                        )}
                      </div>
                    </div>
                  )}

                {coin.links.repos_url.github &&
                  coin.links.repos_url.github.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Source Code
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {coin.links.repos_url.github.map((repo, index) => (
                          <a
                            key={index}
                            href={repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                          >
                            <FaGithub />
                            <span>GitHub Repository {index + 1}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default CoinDetailPage;
