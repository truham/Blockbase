import React from "react";
import Image from "next/image";
import { RawNFT } from "../types";

interface NFTCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: RawNFT;
}

const NFTCardModal: React.FC<NFTCardModalProps> = ({
  isOpen,
  onClose,
  nft,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="float-right text-2xl font-bold">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{nft.name || "Untitled"}</h2>
        <div className="mb-4">
          <Image
            src={nft.image?.thumbnailUrl || "/default-image-url.jpg"}
            alt={nft.name || "Untitled"}
            width={400}
            height={400}
            objectFit="contain"
          />
        </div>
        <p className="mb-2">
          <strong>Description:</strong>{" "}
          {nft.description || "No description available."}
        </p>
        <p className="mb-2">
          <strong>Token ID:</strong> {nft.tokenId}
        </p>
        <p className="mb-2">
          <strong>Contract Address:</strong> {nft.contract.address}
        </p>
      </div>
    </div>
  );
};

export default NFTCardModal;
