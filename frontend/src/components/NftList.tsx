import React, { useEffect } from "react";
import { fetchNFTs } from "../store/nftSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface NftListProps {
  address: string;
}

const NftList: React.FC<NftListProps> = ({ address }) => {
  const dispatch = useAppDispatch();
  const { nfts, loading, error } = useAppSelector((state) => state.nfts);

  useEffect(() => {
    dispatch(fetchNFTs(address));
  }, [dispatch, address]);

  if (loading) return <div>Loading NFTs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="nft-list">
      <h2 className="text-2xl font-bold">NFTs for {address}</h2>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.id}>{nft.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NftList;
