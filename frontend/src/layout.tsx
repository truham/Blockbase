import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
    <>
      <Head>
        <title>BLOCKBASE</title>
        <meta
          name="description"
          content="BLOCKBASE - Your Crypto and NFT Portfolio Viewer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
            <Link href="/" legacyBehavior>
              <a className="text-xl font-bold">BLOCKBASE</a>
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/all-coins" legacyBehavior>
                  <a className="hover:underline">Cryptocurrencies</a>
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="hover:underline focus:outline-none flex items-center"
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
                    className="absolute z-10 font-normal bg-white text-blue-600 mt-1 rounded shadow-lg w-52 right-0"
                    ref={menuRef}
                  >
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link href="/nfts/portfolio-appraisal" legacyBehavior>
                          <a className="block px-4 py-2 hover:bg-gray-100">
                            Portfolio Appraisal
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow w-full">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <div className="max-w-screen-xl mx-auto">
            &copy; {new Date().getFullYear()} BLOCKBASE. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
