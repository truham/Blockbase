import { useState, useEffect } from "react";
import { NFT } from "../../types";
import { fetchNFTsForOwner } from "../../services/nftService";
import Layout from "../../layout";

const ITEMS_PER_PAGE = 10;

const PortfolioAppraisal: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const sampleWalletAddress = "0xc6400A5584db71e41B0E5dFbdC769b54B91256CD";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    await fetchNFTs(walletAddress);
  };

  const fetchNFTs = async (address: string) => {
    setLoading(true);
    setError("");

    try {
      const ownedNfts = await fetchNFTsForOwner(address);
      setNfts(ownedNfts);
    } catch (err) {
      setError("Error fetching NFTs. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const useSampleAddress = () => {
    setWalletAddress(sampleWalletAddress);
    setCurrentPage(1);
    fetchNFTs(sampleWalletAddress);
  };

  const totalPages = Math.ceil(nfts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNFTs = nfts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">NFT Portfolio Appraisal</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="border p-2 mr-2 text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mr-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch NFTs"}
          </button>
          <button
            type="button"
            onClick={useSampleAddress}
            className="bg-green-500 text-white p-2 rounded"
            disabled={loading}
          >
            Use Test Address
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {nfts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Owned NFTs:</h2>
            <ul className="space-y-4 mb-4">
              {currentNFTs.map((nft, index) => (
                <li
                  key={index}
                  className="flex items-center bg-gray-100 p-4 rounded-lg"
                >
                  <img
                    src={nft.imageUrl || "https://via.placeholder.com/100"}
                    alt={nft.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{nft.name}</h3>
                    <p className="text-sm text-gray-600">
                      {nft.collectionName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Token ID: {nft.tokenId}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PortfolioAppraisal;
