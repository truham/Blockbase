import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RawNFT } from "../types";
import NFTCardModal from "./NFTCardModal";

// Import local logo assets
import openSeaLogo from "../assets/logos/opensea_logo.png";
import magicEdenLogo from "../assets/logos/magic_eden_logo.png";
import blurLogo from "../assets/logos/blur_logo.png";
import looksRareLogo from "../assets/logos/looksrare_logo.png";
import etherscanLogo from "../assets/logos/etherscan_logo.png";

interface NFTCardProps {
  nft: RawNFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSeaUrl = `https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`;
  const magicEdenUrl = `https://magiceden.us/collections/ethereum/${nft.collection?.slug ?? nft.collection?.name ?? "unknown"
    }`;
  const blurUrl = `https://blur.io/collection/${nft.collection?.slug ?? nft.collection?.name ?? "unknown"
    }`;
  const looksRareUrl = `https://looksrare.org/collections/${nft.contract.address}/${nft.tokenId}`;
  const etherscanUrl = `https://etherscan.io/token/${nft.contract.address}?a=${nft.tokenId}`;

  return (
    <>
      <div className="border p-4 w-full max-w-xs bg-white rounded-lg shadow-md h-full max-h-[400px] flex flex-col">
        <h2 className="text-xl font-semibold mb-2 text-center">
          {nft.name || "Untitled"}
        </h2>
        <div
          className="w-full h-48 relative mb-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={nft.image?.thumbnailUrl || nft.image?.cachedUrl || "/default-nft-image.svg"}
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
            <Image src={openSeaLogo} alt="OpenSea" width={24} height={24} />
          </Link>
          <Link
            href={magicEdenUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View on Magic Eden"
            className="relative w-6 h-6 overflow-hidden rounded-full"
          >
            <Image
              src={magicEdenLogo}
              alt="Magic Eden"
              layout="fill"
              objectFit="cover"
            />
          </Link>
          <Link
            href={blurUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View on Blur"
          >
            <Image src={blurLogo} alt="Blur" width={24} height={24} />
          </Link>
          <Link
            href={looksRareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View on LooksRare"
          >
            <Image src={looksRareLogo} alt="LooksRare" width={24} height={24} />
          </Link>
          <Link
            href={etherscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View on Etherscan"
          >
            <Image src={etherscanLogo} alt="Etherscan" width={24} height={24} />
          </Link>
        </div>
      </div>

      <NFTCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nft={nft}
      />
    </>
  );
};

export default NFTCard;
