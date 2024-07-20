import React from "react";
import Head from "next/head";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
                <Link href="/" legacyBehavior>
                  <a className="hover:underline">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="hover:underline">About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="hover:underline">Contact</a>
                </Link>
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
