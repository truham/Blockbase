import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTsByCollectionThunk } from "../../../store/nfts";
import NFTCards from "../NFTCards/NFTCards";

const NFTCollections = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(
    "0x33fd426905f149f8376e227d0c9d3340aad17af1"
  );

  const nfts = useSelector((state) => state.nfts?.nfts?.nfts);

  useEffect(() => {
    dispatch(getNFTsByCollectionThunk(address));
  }, [dispatch, address]);

  if (!nfts) return <h1>Loading...</h1>;

  return (
    <>
      <div className="flex flex-wrap items-center justify-center -m-4">
        {nfts?.map((NFT, idx) => {
          return (
            <div
              key={idx}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 justify-center items-center"
            >
              <NFTCards NFT={NFT} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NFTCollections;
