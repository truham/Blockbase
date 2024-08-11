import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import { fetchNFTsForContract } from "../../store/nftCollectionsSlice";
import { RootState, AppDispatch } from "../../store";
import { RawNFT } from "../../types";
import Image from "next/image";

const NFTCollections: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nfts, loading, error, nextPageKey } = useSelector(
    (state: RootState) => state.nftCollections
  );
  const [contractAddress, setContractAddress] = useState<string>("");
  const [submittedAddress, setSubmittedAddress] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [collectionDescription, setCollectionDescription] = useState<
    string | null
  >(null);

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
    if (submittedAddress && nfts.length > 0) {
      const firstNFT = nfts[0];
      setCollectionName(firstNFT.collection?.name || "Unknown Collection");
      setCollectionDescription(
        firstNFT.contract?.openSeaMetadata?.description || ""
      );
    }
  }, [nfts, submittedAddress]);

  useEffect(() => {
    if (submittedAddress) {
      document.title = `NFTs for ${submittedAddress}`;
    } else {
      document.title = "NFT Collections";
    }
  }, [submittedAddress]);

  const lastNFTElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageKey) {
          dispatch(
            fetchNFTsForContract({
              contractAddress: submittedAddress!,
              startToken: nextPageKey,
              limit: 50,
            })
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextPageKey, dispatch, submittedAddress]
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
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

        {submittedAddress && (
          <>
            <h2 className="text-3xl font-bold text-left mb-4">
              {collectionName || "Collection Name"}
            </h2>
            {collectionDescription && (
              <p className="text-left text-lg text-gray-600 mb-8">
                {collectionDescription}
              </p>
            )}
          </>
        )}

        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft: RawNFT, index) => (
                <li
                  key={nft.tokenId}
                  className="flex flex-col items-center"
                  ref={nfts.length === index + 1 ? lastNFTElementRef : null}
                >
                  <div className="border p-4 w-full max-w-xs bg-white rounded-lg shadow-md h-full max-h-[400px] flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 text-center">
                      {nft.name || "Untitled"}
                    </h2>
                    <div className="w-full h-48 relative mb-2">
                      <Image
                        src={
                          nft.image?.thumbnailUrl || "/default-image-url.jpg"
                        }
                        alt={nft.name || "Untitled"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {loading && <div className="text-center mt-4">Loading...</div>}
          </>
        )}
      </div>
    </Layout>
  );
};

export default NFTCollections;
