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
          <svg
            width="24"
            height="24"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
              fill="#E42575"
            />
            <path
              d="M33.6 15.2C33.6 15.2 29.6 12.8 20 12.8C10.4 12.8 6.4 15.2 6.4 15.2V17.6C6.4 17.6 10.4 15.2 20 15.2C29.6 15.2 33.6 17.6 33.6 17.6V15.2ZM33.6 20C33.6 20 29.6 17.6 20 17.6C10.4 17.6 6.4 20 6.4 20V22.4C6.4 22.4 10.4 20 20 20C29.6 20 33.6 22.4 33.6 22.4V20ZM33.6 24.8C33.6 24.8 29.6 22.4 20 22.4C10.4 22.4 6.4 24.8 6.4 24.8V27.2C6.4 27.2 10.4 24.8 20 24.8C29.6 24.8 33.6 27.2 33.6 27.2V24.8Z"
              fill="white"
            />
          </svg>
        </Link>
        <Link
          href={blurUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View on Blur"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
              fill="#0000FF"
            />
            <path
              d="M17.9999 12.0001C17.9999 15.3138 15.3136 18.0001 11.9999 18.0001C8.68624 18.0001 5.99994 15.3138 5.99994 12.0001C5.99994 8.68641 8.68624 6.00011 11.9999 6.00011C15.3136 6.00011 17.9999 8.68641 17.9999 12.0001Z"
              fill="white"
            />
          </svg>
        </Link>
        <Link
          href={looksRareUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View on LooksRare"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
              fill="#0CE466"
            />
            <path
              d="M17.4849 7.1716C15.8358 5.52254 13.4806 5.52254 11.8315 7.1716L11.6411 7.36194L11.4508 7.1716C9.80168 5.52254 7.44647 5.52254 5.79736 7.1716C4.14825 8.82066 4.14825 11.1759 5.79736 12.8249L11.6411 18.6687L17.4849 12.8249C19.134 11.1759 19.134 8.82066 17.4849 7.1716Z"
              fill="white"
            />
          </svg>
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
