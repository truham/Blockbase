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

import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
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
              <Route exact path="/nft">
                <NFTView />
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
