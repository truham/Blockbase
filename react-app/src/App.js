import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/Signup/SignupFormPage";
import LoginFormPage from "./components/Login/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Explore from "./components/Explore/Explore";
import Featured from "./components/Featured/Featured";
import CryptoDetails from "./components/Crypto/CryptoDetails/CryptoDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {/* Hero */}
            <Featured />
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
    </>
  );
}

export default App;
