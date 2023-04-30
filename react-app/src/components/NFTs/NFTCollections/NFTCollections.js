import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTsByCollectionThunk } from "../../../store/nfts";
import NFTCollectionsCard from "./NFTCollectionsCard";

const NFTCollections = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState(
    "0x33fd426905f149f8376e227d0c9d3340aad17af1"
  );

  const nfts = useSelector((state) => state.nfts?.nfts?.nfts);

  useEffect(() => {
    dispatch(
      getNFTsByCollectionThunk("0x33fd426905f149f8376e227d0c9d3340aad17af1")
    );
  }, [dispatch]);

  const findNFTs = async () => {
    await dispatch(getNFTsByCollectionThunk(address));
    setSubmittedAddress(address);
  };

  if (!nfts) return <h1>Loading...</h1>;

  return (
    <>
      <div className="flex flex-col items-center pt-10">
        <input
          className="nft-view-search-container-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Insert wallet address"
        ></input>
        <button
          className="btn btn-sm bg-[#344afb] hover:bg-[#2c3fd6]"
          onClick={(e) => findNFTs(e)}
        >
          Search
        </button>
        <span className="pt-2 underline font-bold">Currently viewing:</span>
        <span>{`${submittedAddress.slice(0, 6)}...${submittedAddress.slice(
          submittedAddress.length - 4
        )}`}</span>
      </div>
      <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {nfts?.map((NFT, idx) => {
          return (
            <div className="mx-auto px-2 py-4 w-64 h-64" key={idx}>
              <NFTCollectionsCard NFT={NFT} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NFTCollections;
