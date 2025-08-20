import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { NFT } from "../types";

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: NFT;
}

const NFTModal: React.FC<NFTModalProps> = ({ isOpen, onClose, nft }) => {
  const [isTraitsOpen, setIsTraitsOpen] = useState(true);
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

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
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
        <div className="mb-4 flex justify-center">
          <div className="relative w-96 h-96">
            <Image
              src={nft.imageUrl || "/default-nft-image.svg"}
              alt={nft.name || "Untitled"}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
        <p className="mb-2">
          <strong>Collection:</strong> {nft.collectionName}
        </p>
        <p className="mb-2">
          <strong>Token ID:</strong> {nft.tokenId}
        </p>
        <p className="mb-2">
          <strong>Description:</strong>{" "}
          {nft.description || "No description available."}
        </p>

        {/* Traits section with dropdown */}
        <div className="mt-4">
          <button
            onClick={() => setIsTraitsOpen(!isTraitsOpen)}
            className="flex items-center text-xl font-semibold mb-2"
          >
            <span className="mr-2">Traits</span>
            {isTraitsOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          {isTraitsOpen && (
            <div className="grid grid-cols-2 gap-2">
              {nft.attributes?.map((trait, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded">
                  <p className="font-semibold">{trait.trait_type}</p>
                  <p>{trait.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTModal;
