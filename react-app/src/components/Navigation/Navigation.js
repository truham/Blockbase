import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/blockbase-logo.png";
// import { Web3Button } from "@web3modal/react";

function Navigation() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  const nftsAppraisalRoute = () => {
    history.push("/nft/profile/appraise");
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
              className="md:my-0 md:ml-8 flex items-center justify-between py-2 pl-3 pr-4 mr-8 rounded md:border-0 hover:text-[#344afb] md:p-0 md:w-auto"
            >
              {/* className="md:my-0 md:ml-8 bg-[#344afb] text-white px-4 py-2 rounded-lg hover:bg-[#2c3fd6]" */}
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
                  <li>
                    <span
                      onClick={nftsAppraisalRoute}
                      className="cursor-pointer block px-4 py-2 hover:bg-gray-100"
                    >
                      Portfolio Appraisal
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <w3m-core-button icon="hide" label="Connect"></w3m-core-button>
          {/* <Web3Button /> */}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
