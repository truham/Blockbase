import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RawNFT } from "../types";

interface NFTCardProps {
  nft: RawNFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const openSeaUrl = `https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`;
  const magicEdenUrl = `https://magiceden.io/item-details/${nft.contract.address}/${nft.tokenId}`;
  const blurUrl = `https://blur.io/asset/${nft.contract.address}/${nft.tokenId}`;
  const looksRareUrl = `https://looksrare.org/collections/${nft.contract.address}/${nft.tokenId}`;
  const etherscanUrl = `https://etherscan.io/token/${nft.contract.address}?a=${nft.tokenId}`;

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
      <div className="mt-auto flex justify-center items-center gap-4">
        <Link
          href={openSeaUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View on OpenSea"
        >
          <Image
            src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.svg"
            alt="OpenSea"
            width={24}
            height={24}
          />
        </Link>
        <Link
          href={magicEdenUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View on Magic Eden"
        >
          <Image
            src="https://assets.website-files.com/62d868f7d50b42d9dfa0fc85/62d8d1c9f128e6a6b7f6b5e8_logo-icon.svg"
            alt="Magic Eden"
            width={24}
            height={24}
          />
        </Link>
        <Link
          href={blurUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View on Blur"
        >
          <Image
            src="https://blur.io/favicons/favicon-32x32.png"
            alt="Blur"
            width={24}
            height={24}
          />
        </Link>
        <Link
          href={looksRareUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View on LooksRare"
        >
          <Image
            src="https://looksrare.org/favicon.png"
            alt="LooksRare"
            width={24}
            height={24}
          />
        </Link>
        <Link
          href={etherscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View on Etherscan"
        >
          <Image
            src="https://etherscan.io/images/favicon3.ico"
            alt="Etherscan"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default NFTCard;
