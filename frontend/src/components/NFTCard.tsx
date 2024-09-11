import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RawNFT } from "../types";

interface NFTCardProps {
  nft: RawNFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const openSeaUrl = `https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`;
  const etherscanUrl = `https://etherscan.io/token/${nft.contract.address}?a=${nft.tokenId}`;
  const looksRareUrl = `https://looksrare.org/collections/${nft.contract.address}/${nft.tokenId}`;

  return (
    <div className="border p-4 w-full max-w-xs bg-white rounded-lg shadow-md h-full max-h-[400px] flex flex-col">
      <h2 className="text-xl font-semibold mb-2 text-center">
        {nft.name || "Untitled"}
      </h2>
      <div className="w-full h-48 relative mb-2">
        <Image
          src={nft.image?.thumbnailUrl || "/default-image-url.jpg"}
          alt={nft.name || "Untitled"}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="mt-auto flex justify-center space-x-2">
        <Link href={openSeaUrl} passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            OpenSea
          </a>
        </Link>
        <Link href={etherscanUrl} passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Etherscan
          </a>
        </Link>
        <Link href={looksRareUrl} passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LooksRare
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NFTCard;
