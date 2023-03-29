import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../Login/LoginFormModal/index";
import SignupFormModal from "../Signup/SignupFormModal/index";
import OpenModalButton from "../OpenModalButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navbar">
      <ul className="navbar-content">
        <li className="nav-left-section">
          <NavLink exact to="/">
            <img
              className="logo-image"
              src="https://pyxis.nymag.com/v1/imgs/9e4/3ea/e598087fd3841797d51b6b4b371d7132ab-17-totoro-studio-ghibli-hbomax.1x.rsquare.w1400.jpg"
              alt="logo"
            ></img>
          </NavLink>
        </li>
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
