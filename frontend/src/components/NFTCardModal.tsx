import React, { useRef, useEffect } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg w-11/12 h-5/6 max-w-6xl overflow-y-auto"
      >
        <button onClick={onClose} className="float-right text-2xl font-bold">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{nft.name || "Untitled"}</h2>
        <div className="mb-4">
          <Image
            src={nft.image?.cachedUrl || "/default-image-url.jpg"}
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

        {/* Add traits section */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Traits</h3>
          <div className="grid grid-cols-2 gap-2">
            {nft.raw?.metadata?.attributes?.map((trait, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded">
                <p className="font-semibold">{trait.trait_type}</p>
                <p>{trait.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCardModal;
