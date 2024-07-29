import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import { fetchNFTs } from "../../store/nftSlice";
import { RootState, AppDispatch } from "../../store";

const PortfolioAppraisal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nfts, loading, error } = useSelector(
    (state: RootState) => state.nfts
  );
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [submittedAddress, setSubmittedAddress] = useState<string | null>(null);

  const handleSearch = () => {
    if (walletAddress) {
      setSubmittedAddress(walletAddress);
      localStorage.setItem("lastSearchedAddress", walletAddress);
      dispatch(fetchNFTs(walletAddress));
    }
  };

  const useTestAddress = () => {
    const testAddress = "0xB7d6ed1d7038BaB3634eE005FA37b925B11E9b13";
    setWalletAddress(testAddress);
    setSubmittedAddress(testAddress);
    localStorage.setItem("lastSearchedAddress", testAddress);
    dispatch(fetchNFTs(testAddress));
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem("lastSearchedAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
      dispatch(fetchNFTs(savedAddress));
      setSubmittedAddress(savedAddress);
    }
  }, [dispatch]);

  useEffect(() => {
    if (submittedAddress) {
      document.title = `NFTs for ${submittedAddress}`;
    } else {
      document.title = "Portfolio Appraisal";
    }
  }, [submittedAddress]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {!submittedAddress ? (
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-blue-600 mb-4">
              Welcome to Portfolio Appraisal
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Enter a wallet address to view its NFT portfolio.
            </p>
            <div className="flex flex-col items-center mb-4">
              <input
                type="text"
                placeholder="Enter wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
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
                placeholder="Enter wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default PortfolioAppraisal;
