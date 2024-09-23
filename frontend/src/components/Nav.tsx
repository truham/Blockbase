import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import blockbaseLogo from "../assets/blockbase-logo.png";

const Nav: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full sticky top-0 left-0 bg-white z-50 border-b border-gray-300">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link href="/" legacyBehavior>
          <a className="flex items-center">
            <Image
              src={blockbaseLogo}
              alt="BLOCKBASE Logo"
              height={30}
              style={{ width: "auto" }}
            />
          </a>
        </Link>
        <ul className="flex space-x-8">
          <li>
            <Link href="/cryptocurrencies/all-coins" legacyBehavior>
              <a className="hover:underline text-gray-700">Cryptocurrencies</a>
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="hover:underline focus:outline-none flex items-center text-gray-700"
            >
              NFTs
              <svg
                className="w-5 h-5 ml-1"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {showMenu && (
              <div
                id="dropdownNavbar"
                className="absolute z-10 font-normal bg-white text-gray-700 mt-1 rounded-lg shadow-xl w-52 right-0 border border-gray-300"
                ref={menuRef}
              >
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link href="/nfts/portfolio" legacyBehavior>
                      <a className="block px-4 py-2 hover:bg-gray-100">
                        Portfolio Appraisal
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/nfts/collections" legacyBehavior>
                      <a className="block px-4 py-2 hover:bg-gray-100">
                        Collections
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
