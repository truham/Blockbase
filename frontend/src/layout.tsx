import React from "react";
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>My Crypto NFT App</title>
        <meta name="description" content="An app for viewing crypto and NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">Crypto NFT App</div>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <div className="container mx-auto">
            &copy; {new Date().getFullYear()} Crypto NFT App. All rights
            reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
