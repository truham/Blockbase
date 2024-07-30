import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import { fetchNFTsForContract } from "../../store/nftCollectionsSlice";
import { RootState, AppDispatch } from "../../store";
import { RawNFT } from "../../types";

const NFTCollections: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nfts, loading, error, nextPageKey } = useSelector(
    (state: RootState) => state.nftCollections
  );
  const [contractAddress, setContractAddress] = useState<string>("");
  const [submittedAddress, setSubmittedAddress] = useState<string | null>(null);

  const handleSearch = () => {
    if (contractAddress) {
      setSubmittedAddress(contractAddress);
      localStorage.setItem("lastSearchedContract", contractAddress);
      dispatch(fetchNFTsForContract({ contractAddress, limit: 50 }));
    }
  };

  const useTestAddress = () => {
    const testAddress = "0x33FD426905F149f8376e227d0C9D3340AaD17aF1";
    setContractAddress(testAddress);
    setSubmittedAddress(testAddress);
    localStorage.setItem("lastSearchedContract", testAddress);
    dispatch(fetchNFTsForContract({ contractAddress: testAddress, limit: 50 }));
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem("lastSearchedContract");
    if (savedAddress) {
      setContractAddress(savedAddress);
      dispatch(
        fetchNFTsForContract({ contractAddress: savedAddress, limit: 50 })
      );
      setSubmittedAddress(savedAddress);
    }
  }, [dispatch]);

  useEffect(() => {
    if (submittedAddress) {
      document.title = `NFTs for ${submittedAddress}`;
    } else {
      document.title = "NFT Collections";
    }
  }, [submittedAddress]);

  const handlePagination = (startToken?: string) => {
    if (submittedAddress) {
      dispatch(
        fetchNFTsForContract({
          contractAddress: submittedAddress,
          startToken,
          limit: 50,
        })
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {!submittedAddress ? (
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-blue-600 mb-4">
              Welcome to NFT Collections
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Enter a contract address to view its NFTs.
            </p>
            <div className="flex flex-col items-center mb-4">
              <input
                type="text"
                placeholder="Enter contract address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full max-w-md bg-white text-black mb-2"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Search
                </button>
                <button
                  onClick={useTestAddress}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Use Test Address
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-4">
              <input
                type="text"
                placeholder="Enter contract address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full max-w-md bg-white text-black mb-2"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Search
                </button>
                <button
                  onClick={useTestAddress}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Use Test Address
                </button>
              </div>
            </div>
            <p className="text-center text-lg text-gray-700 mb-8">
              Currently viewing NFTs for: {submittedAddress}
            </p>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : nfts.length === 0 ? (
              <p>No NFTs found for this contract address.</p>
            ) : (
              <>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {nfts.map((nft: RawNFT) => (
                    <li
                      key={nft.tokenId}
                      className="flex flex-col items-center"
                    >
                      <div className="border p-4 w-full max-w-xs bg-white rounded-lg shadow-md h-full max-h-[400px] flex flex-col">
                        <h2 className="text-xl font-semibold mb-2 text-center">
                          {nft.name || "Untitled"}
                        </h2>
                        <img
                          src={nft.image?.cachedUrl || "default-image-url"}
                          alt={nft.name || "Untitled"}
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                        <p className="text-sm text-gray-600 text-center mt-auto">
                          <strong>Collection:</strong>{" "}
                          {nft.collection?.name || "Unknown Collection"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-4">
                  {nextPageKey && (
                    <button
                      onClick={() => handlePagination(nextPageKey)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default NFTCollections;
