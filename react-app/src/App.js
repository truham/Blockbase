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
import { SignClient } from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";

import "./index.css";

const web3Modal = new Web3Modal({
  projectId: process.env.REACT_APP_PROJECT_ID,
  standaloneChains: ["eip155:5"],
});

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const [signClient, setSignClient] = useState();

  async function createClient() {
    try {
      const client = await SignClient.init({
        projectId: process.env.REACT_APP_PROJECT_ID,
      });
      setSignClient(client);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!signClient) {
      createClient();
    }
  }, [signClient]);

  // useEffect(() => {
  //   dispatch(authenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  const handleConnect = async () => {
    if (!signClient) throw Error("Cannot connect. Sign Client is not created");
    try {
      // dapp going to send a proposal namespace
      const proposalNameSpace = {
        eip155: {
          chains: ["eip155:5"],
          methods: ["eth_sendTransaction"],
          events: ["connect", "disconnect"],
        },
      };

      const { uri } = await signClient.connect({
        requiredNamespaces: proposalNameSpace,
      });

      if (uri) {
        web3Modal.openModal({ uri });
      }

      console.log("uri", uri);
    } catch (e) {}
  };

  return (
    <>
      <Navigation />
      <button onClick={handleConnect} disabled={!signClient}>
        Connect
      </button>
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
    </>
  );
}

export default App;
