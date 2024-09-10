import React from "react";
import Head from "next/head";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

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
        <Nav />
        <div>HELLO TESTING</div>
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
