import { useState, useEffect, useRef, useCallback } from "react";
import { GetStaticProps } from "next";
import { NFT } from "../../src/types";
import { fetchNFTsForOwner } from "../../src/services/nftService";
import Layout from "../../src/layout";
import NFTModal from "../../src/components/NFTModal";
import LoadingSquiggle from "../../src/components/LoadingSquiggle";

const ITEMS_PER_PAGE = 12;

interface NFTPortfolioProps {
  fallback?: boolean;
}

const NFTPortfolio: React.FC<NFTPortfolioProps> = ({ fallback }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [collections, setCollections] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [hasMore, setHasMore] = useState(true);
  const [currentNFTs, setCurrentNFTs] = useState<NFT[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const sampleWalletAddress = "0xc6400A5584db71e41B0E5dFbdC769b54B91256CD";

  const handleSubmit = async (
    e: React.FormEvent | null,
    address: string = walletAddress
  ) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    setLoading(true);
    setError(null);
    try {
      const fetchedNfts = await fetchNFTsForOwner(address);
      setNfts(fetchedNfts);
      setFilteredNfts(fetchedNfts);

      // Generate collections object
      const collectionsObj = fetchedNfts.reduce(
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
      setError("Failed to fetch NFTs. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const useSampleAddress = () => {
    setWalletAddress(sampleWalletAddress);
    handleSubmit(null, sampleWalletAddress);
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

  const loadMoreNFTs = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const nextNFTs = filteredNfts.slice(startIndex, endIndex);

    if (nextNFTs.length > 0) {
      setCurrentNFTs((prevNFTs) => [...prevNFTs, ...nextNFTs]);
      setCurrentPage(nextPage);
    }

    if (endIndex >= filteredNfts.length) {
      setHasMore(false);
    }
  }, [currentPage, filteredNfts]);

  const lastNFTElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreNFTs();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMoreNFTs]
  );

  useEffect(() => {
    setCurrentNFTs(filteredNfts.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
    setHasMore(filteredNfts.length > ITEMS_PER_PAGE);
  }, [filteredNfts]);

  const openModal = (nft: NFT) => {
    setSelectedNFT(nft);
  };

  const closeModal = () => {
    setSelectedNFT(null);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">NFT Portfolio</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="mb-4">
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
        {loading ? (
          <LoadingSquiggle />
        ) : nfts.length > 0 ? (
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
                    ref={
                      index === currentNFTs.length - 1
                        ? lastNFTElementRef
                        : null
                    }
                    className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                    onClick={() => openModal(nft)}
                  >
                    <div className="w-full h-48 relative mb-3">
                      <img
                        src={nft.imageUrl || "/default-nft-image.svg"}
                        alt={nft.name}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== "/default-nft-image.svg") {
                            target.src = "/default-nft-image.svg";
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2 px-2 py-1">
                      <h3 className="font-semibold text-lg truncate leading-tight">{nft.name}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {nft.collectionName}
                      </p>
                      <div className="text-xs text-gray-500">
                        <p className="font-medium mb-1">Token ID:</p>
                        <p className="font-mono text-gray-400 truncate leading-4 pr-4" title={nft.tokenId}>
                          {nft.tokenId}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <div className="flex justify-center">
                  <LoadingSquiggle />
                </div>
              )}
            </div>
          </div>
        ) : null}
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

// Enable static generation
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      fallback: true,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default NFTPortfolio;
