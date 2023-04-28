import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTsByAddressThunk } from "../../../store/nfts";
import NFTCards from "../NFTCards/NFTCards";
import "./NFTView.css";

const NFTView = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState(
    "0xc6400A5584db71e41B0E5dFbdC769b54B91256CD"
  );
  const error = useSelector((state) => state.nfts.error);
  const NFTs = useSelector((state) => state.nfts?.nfts);

  useEffect(() => {
    dispatch(
      getNFTsByAddressThunk("0xc6400A5584db71e41B0E5dFbdC769b54B91256CD")
    );
  }, [dispatch]);

  const findNFTs = async () => {
    await dispatch(getNFTsByAddressThunk(address));
    setSubmittedAddress(address);
  };

  if (!NFTs) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="nft-view-search-container">
        <input
          className="nft-view-search-container-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Insert wallet address"
        ></input>
        <button onClick={(e) => findNFTs(e)}>Search</button>
        <span className="pt-2 underline font-bold">Currently viewing:</span>
        <span>{`${submittedAddress.slice(0, 6)}...${submittedAddress.slice(
          submittedAddress.length - 4
        )}`}</span>
        {error && <span>Error: {error.error}</span>}
      </div>
      <div className="nft-view-cards-container">
        {NFTs?.ownedNfts.map((NFT, idx) => {
          return <NFTCards NFT={NFT} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default NFTView;
