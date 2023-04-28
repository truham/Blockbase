import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/blockbase-logo.png";

function Navigation() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, []);

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // Metamask is installed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      // Metamask NOT installed
      alert("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          console.log(accounts[0]);
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      setWalletAddress("");
    }
  };

  const logoHome = () => {
    history.push("/");
  };

  const cryptoRoute = () => {
    history.push("/cryptocurrencies");
  };

  const nftsRoute = () => {
    history.push("/nft");
  };

  return (
    <div
      className="w-full sticky top-0 left-0"
      style={{ borderBottom: "1px solid #312e45" }}
    >
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* Logo left */}
        <div className="flex items-center">
          <img
            onClick={logoHome}
            className="h-8 cursor-pointer"
            src={logo}
            alt="logo"
          ></img>
        </div>

        {/* Hamburger menu open items */}
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        {/* Menu items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 ${
            open ? "h-screen top-19 opacity-100" : "top-[-490px]"
          } md:opacity-100 opacity-0`}
        >
          <li
            onClick={cryptoRoute}
            className="md:my-0 my-7 md:ml-8 cursor-pointer hover:text-[#344afb]"
          >
            Cryptocurrencies
          </li>
          <li
            onClick={nftsRoute}
            className="md:my-0 my-7 md:ml-8 cursor-pointer hover:text-[#344afb]"
          >
            NFTs
          </li>
          <button
            onClick={connectWallet}
            className="md:my-0 md:ml-8 bg-[#344afb] text-white px-4 py-2 rounded-lg hover:bg-[#2c3fd6]"
          >
            {walletAddress?.length > 0
              ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(
                  38
                )}`
              : "Connect"}
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
