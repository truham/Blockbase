import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../Login/LoginFormModal/index";
import SignupFormModal from "../Signup/SignupFormModal/index";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user.profile_picture ? (
        <img
          className="navigation-profile-picture"
          src={user.profile_picture}
          onClick={openMenu}
          alt="user profile pic"
        ></img>
      ) : (
        <i
          style={{ fontSize: "40px", cursor: "pointer" }}
          className="fas fa-user-circle"
          onClick={openMenu}
        />
      )}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{`${user.first_name} ${user.last_name}`}</li>
            <hr></hr>
            <li>
              <i
                className="fa-regular fa-user"
                style={{ color: "#757575" }}
              ></i>
              <NavLink
                onClick={closeMenu}
                className="profile-menu-prof"
                to={`/profiles/${user.id}`}
              >
                Profile
              </NavLink>
            </li>
            <hr></hr>
            <li>
              <i
                className="fas fa-regular fa-arrow-right-from-bracket"
                style={{ color: "#757575" }}
              ></i>
              <span className="profile-dropdown-logout" onClick={handleLogout}>
                Sign Out
              </span>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
