import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTsByCollectionThunk } from "../../../store/nfts";
import NFTCollectionsCard from "./NFTCollectionsCard";

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
