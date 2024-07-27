import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { getNFTs } from "../../services/nftService";
import { RawNFTResponse, NFT } from "../../types";

const PortfolioAppraisal: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const walletAddress = "0xB7d6ed1d7038BaB3634eE005FA37b925B11E9b13"; // Replace with dynamic address if needed
        const nftsData: RawNFTResponse = await getNFTs(walletAddress);

        console.log("Raw NFT Data:", nftsData); // Log raw data for debugging

        const parsedNFTs = nftsData.ownedNfts.map((nft) => ({
          tokenId: nft.tokenId,
          title: nft.name || "Untitled",
          description: nft.description || "No description",
          image: nft.image?.cachedUrl || "default-image-url",
          collection: nft.collection?.name || "Unknown Collection",
        }));

        console.log("Parsed NFT Data:", parsedNFTs); // Log parsed data for debugging

        setNfts(parsedNFTs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Portfolio Appraisal
        </h1>
        <div className="mt-4 text-lg text-gray-700">
          {nfts.length === 0 ? (
            <p>No NFTs found for this address.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft) => (
                <li key={nft.tokenId} className="flex flex-col items-center">
                  <div className="border p-4 w-full max-w-xs bg-white rounded-lg shadow-md h-full max-h-[400px] flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                      {nft.title}
                    </h2>
                    <img
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                    {/* <p className="text-sm text-gray-600">{nft.description}</p> */}
                    <p className="text-sm text-gray-600 text-center mt-auto">
                      <strong>Collection:</strong> {nft.collection}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PortfolioAppraisal;
