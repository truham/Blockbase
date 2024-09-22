import { useState, useEffect } from "react";
import { NFT } from "../../types";
import { fetchNFTsForOwner } from "../../services/nftService";
import Layout from "../../layout";
import NFTModal from "../../components/NFTModal";

const ITEMS_PER_PAGE = 12;

const PortfolioAppraisal: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [collections, setCollections] = useState<{ [key: string]: boolean }>(
    {}
  );

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
      setFilteredNfts(ownedNfts);

      // Generate collections object
      const collectionsObj = ownedNfts.reduce(
        (acc: { [key: string]: boolean }, nft: NFT) => {
          if (nft.collectionName) {
            acc[nft.collectionName] = true;
          }
          return acc;
        },
        {}
      );

      setCollections(collectionsObj);
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

  const toggleCollection = (collectionName: string) => {
    setCollections((prev) => ({
      ...prev,
      [collectionName]: !prev[collectionName],
    }));
  };

  useEffect(() => {
    const selectedCollections = Object.entries(collections)
      .filter(([_, isSelected]) => isSelected)
      .map(([name, _]) => name);

    if (selectedCollections.length === 0) {
      setFilteredNfts(nfts);
    } else {
      setFilteredNfts(
        nfts.filter((nft) => selectedCollections.includes(nft.collectionName))
      );
    }
    setCurrentPage(1);
  }, [collections, nfts]);

  const totalPages = Math.ceil(filteredNfts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNFTs = filteredNfts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  const closeModal = () => {
    setSelectedNFT(null);
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
          <div className="flex relative">
            {/* Filter Section */}
            <div className="w-1/4 pr-4 sticky top-4 self-start max-h-[calc(100vh-200px)] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">
                Filter by Collection
              </h3>
              <div className="overflow-y-auto pr-2">
                {Object.entries(collections).map(
                  ([collectionName, isSelected]) => (
                    <div
                      key={collectionName}
                      className="flex items-center mb-2"
                    >
                      <input
                        type="checkbox"
                        id={collectionName}
                        checked={isSelected}
                        onChange={() => toggleCollection(collectionName)}
                        className="mr-2"
                      />
                      <label htmlFor={collectionName} className="text-sm">
                        {collectionName}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            {/* NFT Grid */}
            <div className="w-3/4">
              <h2 className="text-xl font-semibold mb-4">Owned NFTs:</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {currentNFTs.map((nft, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    onClick={() => openModal(nft)}
                  >
                    <img
                      src={nft.imageUrl || "https://via.placeholder.com/100"}
                      alt={nft.name}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <h3 className="font-semibold text-lg">{nft.name}</h3>
                    <p className="text-sm text-gray-600">
                      {nft.collectionName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Token ID: {nft.tokenId}
                    </p>
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
          </div>
        )}
      </div>
      {selectedNFT && (
        <NFTModal
          isOpen={!!selectedNFT}
          onClose={closeModal}
          nft={selectedNFT}
        />
      )}
    </Layout>
  );
};

export default PortfolioAppraisal;
