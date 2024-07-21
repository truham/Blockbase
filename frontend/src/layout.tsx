import React from "react";
import Head from "next/head";
import Nav from "./components/Nav";

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
        <header>
          <Nav />
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
