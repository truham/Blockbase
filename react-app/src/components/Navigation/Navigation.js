import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/blockbase-logo.png";

function Navigation() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showMenu, setShowMenu] = useState(false);

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
      console.log("Please install MetaMask");
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
      console.log("Please install MetaMask");
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
    setShowMenu(false);
    setOpen(false);
  };

  const cryptoRoute = () => {
    history.push("/cryptocurrencies");
    setShowMenu(false);
    setOpen(false);
  };

  const nftsProfileRoute = () => {
    history.push("/nft/profile");
    setShowMenu(false);
    setOpen(false);
  };

  const nftsCollectionRoute = () => {
    history.push("/nft/collections");
    setShowMenu(false);
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    const dropDownMenu = document.getElementById("dropdownNavbar");
    const dropDownButton = document.getElementById("dropdownNavbarLink");
    if (
      showMenu &&
      !dropDownButton.contains(event.target) &&
      !dropDownMenu.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className="w-full sticky top-0 left-0 bg-white z-50"
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
          <li onClick={cryptoRoute} className="md:p-0 md:my-0 mt-7 md:ml-8">
            <p className="cursor-pointer hover:text-[#344afb] pl-3">
              Cryptocurrencies
            </p>
          </li>
          <li>
            <button
              id="dropdownNavbarLink"
              onClick={() => setShowMenu(!showMenu)}
              className="md:my-0 md:ml-8 flex items-center justify-between py-2 pl-3 pr-4 rounded md:border-0 hover:text-[#344afb] md:p-0 md:w-auto"
            >
              NFTs{" "}
              <svg
                className="w-5 h-5 ml-1"
                aria-hidden="true"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>

            {showMenu && (
              <div
                id="dropdownNavbar"
                className="absolute z-10 font-normal rounded-lg shadow w-44 bg-white"
              >
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <span
                      onClick={nftsProfileRoute}
                      className="cursor-pointer block px-4 py-2 hover:bg-gray-100"
                    >
                      By User Address
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={nftsCollectionRoute}
                      className="cursor-pointer block px-4 py-2 hover:bg-gray-100"
                    >
                      Search Collections
                    </span>
                  </li>
                </ul>
              </div>
            )}
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
