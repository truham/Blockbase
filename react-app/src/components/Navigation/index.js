import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../Login/LoginFormModal/index";
import SignupFormModal from "../Signup/SignupFormModal/index";
import OpenModalButton from "../OpenModalButton";
import logo from "../../assets/blockbase-logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navbar">
      <ul className="navbar-content">
        <div className="nav-left-section">
          <li className="nav-logo">
            <NavLink exact to="/">
              <img className="logo-image" src={logo} alt="logo"></img>
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-cryptocurrencies" to="/cryptocurrencies">
              Cryptocurrencies
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-nfts" to="/nft">
              NFT
            </NavLink>
          </li>
        </div>

        {isLoaded && sessionUser ? (
          <div className="nav-right-section">
            <li className="nav-right-login">
              <ProfileButton user={sessionUser} />
            </li>
          </div>
        ) : (
          <div className="nav-right-login-signup-buttons">
            <OpenModalButton
              buttonText="Sign In"
              modalComponent={<LoginFormModal />}
              buttonStyle="nav-right-login-button"
            />
            <OpenModalButton
              buttonText="Sign up"
              modalComponent={<SignupFormModal />}
              buttonStyle="nav-right-signup-button"
            />
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
