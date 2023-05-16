import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/Signup/SignupFormPage";
import LoginFormPage from "./components/Login/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import Explore from "./components/Explore/Explore";
import Featured from "./components/HomePage/Featured/Featured";
import CryptoDetails from "./components/Crypto/CryptoDetails/CryptoDetails";
import HeroGM from "./components/HomePage/HeroGM/HeroGM";
import HeroMemes from "./components/HomePage/HeroMemes/HeroMemes";
import Footer from "./components/Footer/Footer";
import NFTView from "./components/NFTs/NFTView/NFTView";
import NFTCollections from "./components/NFTs/NFTCollections/NFTCollections";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const projectId = process.env.REACT_APP_PROJECT_ID;
  const chains = [arbitrum, mainnet, polygon];

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 2, chains }),
    publicClient,
  });

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Navigation />
        <div className="page-container">
          <div className="content-wrap">
            {isLoaded && (
              <Switch>
                <Route exact path="/">
                  <HeroGM />
                  <HeroMemes />
                  <Featured />
                </Route>
                <Route exact path="/nft/profile">
                  <NFTView />
                </Route>
                <Route exact path="/nft/collections/">
                  <NFTCollections />
                </Route>
                <Route exact path="/cryptocurrencies/:coinId">
                  <CryptoDetails />
                </Route>
                <Route>
                  <Explore exact path="/cryptocurrencies" />
                </Route>
                <Route path="/login">
                  <LoginFormPage />
                </Route>
                <Route path="/signup">
                  <SignupFormPage />
                </Route>
              </Switch>
            )}
          </div>
          <Footer />
        </div>
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-background-color": "#344afb",
          "--w3m-accent-color": "#344afb",
        }}
      />
    </>
  );
}

export default App;
