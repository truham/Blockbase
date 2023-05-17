import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTsPortfolioAppraiseThunk } from "../../../store/nfts";

const NFTPortfolioAppraisal = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(
    "0x37ABfF4804Cf3e9BF0B0bC0D75880190f35C5981"
  );
  const portfolioItems = useSelector((state) => state.nfts?.portfolio);

  useEffect(() => {
    dispatch(getNFTsPortfolioAppraiseThunk(address));
  }, [dispatch]);

  const handleNewFind = () => {
    dispatch(getNFTsPortfolioAppraiseThunk(address));
  };

  if (!portfolioItems) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <p>Track the value of any NFT portfolio</p>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter an ETH address or ENS"
      ></input>
      <p>Min. Value: {portfolioItems.total_value} ETH</p>
      {portfolioItems.portfolio.map((item) => {
        return (
          <>
            <p>{item.name}</p>
            <img
              style={{ height: "50px" }}
              src={item.image}
              alt={`${item.name} Pic`}
            ></img>
          </>
        );
      })}
    </>
  );
};

export default NFTPortfolioAppraisal;
