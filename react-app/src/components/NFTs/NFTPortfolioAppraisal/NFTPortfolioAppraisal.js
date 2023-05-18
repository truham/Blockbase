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

  const handleNewFind = async () => {
    await dispatch(getNFTsPortfolioAppraiseThunk(address));
  };

  if (!portfolioItems) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg my-4 font-bold">
        Track the value of any NFT portfolio
      </p>
      <input
        className="mb-4 p-2 w-96 h-10 drop-shadow-md rounded-lg"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter an ETH address or ENS"
      ></input>
      <button
        onClick={handleNewFind}
        className="btn btn-sm bg-[#344afb] hover:bg-[#2c3fd6]"
      >
        Search
      </button>
      <br></br>
      <p>Min. Value:</p>
      <p className="text-xl font-bold">
        {portfolioItems.total_value.toFixed(3)} ETH
      </p>
      <br></br>
      <table className="table-auto max-w-1400">
        <thead>
          <tr>
            <th className="p-5"></th>
            <th className="p-5">Collection Name</th>
            <th className="p-5">Total Value</th>
            <th className="p-5">Balance</th>
          </tr>
        </thead>
        <tbody>
          {portfolioItems.portfolio.map((item) => (
            <tr key={item.id}>
              <td className="p-5">
                <div style={{ width: "50px", height: "50px" }}>
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={item.image}
                    alt={`${item.name} Pic`}
                  />
                </div>
              </td>
              <td className="p-5">{item.name}</td>
              <td className="p-5">{item.value.toFixed(3)} ETH</td>
              <td className="p-5">{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NFTPortfolioAppraisal;
