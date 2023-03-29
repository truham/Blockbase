import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [profPicPreview, setProfPicPreview] = useState("");
  const [feErrors, setFeErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // frontend error handling
  useEffect(() => {
    let valErrors = {};

    if (email.length === 0) valErrors.email = "Email is required";
    if (email.length > 253) valErrors.emailLength = "Email must be shortened";
    if (username.length === 0) valErrors.username = "Username is required";
    if (username.length > 38)
      valErrors.usernameLength = "Username must be shortened";
    if (firstName.length === 0) valErrors.firstName = "First name is required";
    if (firstName.length > 38)
      valErrors.firstNameLength = "First name must be shortened";
    if (lastName.length === 0) valErrors.lastName = "Last name is required";
    if (lastName.length > 38)
      valErrors.lastNameLength = "Last name must be shortened";
    if (password.length === 0 || password.length < 5)
      valErrors.password = "Password is required";
    if (password.length > 255)
      valErrors.passwordLength = "Password must be shortened";
    if (confirmPassword.length === 0 || confirmPassword.length < 5)
      valErrors.confirmPassword = "Please confirm password";

    setFeErrors(valErrors);
  }, [
    email,
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    profilePicture,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile_picture", profilePicture);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    setHasSubmitted(true);

    if (Object.values(feErrors).length > 0) return;

    if (password === confirmPassword) {
      setImageLoading(true);
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data);
      } else {
        setImageLoading(false);
        closeModal();
        history.push("/");
      }
    } else {
      setImageLoading(false);
      setErrors([
        ":Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfPicPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <form className="sign-up-modal-container" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {errors.map((error, idx) => (
          <span style={{ color: "#e00707" }} key={idx}>
            {error.split(":")[1]}
          </span>
        ))}

        <div className="sign-up-prof-pic-container">
          {profPicPreview ? (
            <img
              className="sign-up-prof-pic-preview"
              src={profPicPreview}
              alt="Profile Pic Preview"
            ></img>
          ) : (
            <i className="fas fa-user-circle" style={{ fontSize: "40px" }} />
          )}
          <div className="prof-pic-inner-container">
            <span className="prof-pic-text">{`Profile Picture`}</span>
            <label
              className="prof-pic-upload-click"
              htmlFor="sign-up-modal-profile-pic-upload"
            >
              Upload
            </label>
            <input
              id="sign-up-modal-profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={updateImage}
              placeholder="Profile Picture URL (Optional)"
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={
            hasSubmitted && feErrors.email ? { borderColor: "#e00707" } : {}
          }
        />
        <span style={{ color: "#e00707" }}>
          {hasSubmitted && feErrors.emailLength}
        </span>

        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={
            hasSubmitted && feErrors.username ? { borderColor: "#e00707" } : {}
          }
        />
        <span style={{ color: "#e00707" }}>
          {hasSubmitted && feErrors.usernameLength}
        </span>

        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={
            hasSubmitted && feErrors.firstName ? { borderColor: "#e00707" } : {}
          }
        />
        <span style={{ color: "#e00707" }}>
          {hasSubmitted && feErrors.firstNameLength}
        </span>

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={
            hasSubmitted && feErrors.lastName ? { borderColor: "#e00707" } : {}
          }
        />
        <span style={{ color: "#e00707" }}>
          {hasSubmitted && feErrors.lastNameLength}
        </span>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={
            hasSubmitted && feErrors.password ? { borderColor: "#e00707" } : {}
          }
        />
        <span style={{ color: "#e00707" }}>
          {hasSubmitted && feErrors.passwordLength}
        </span>

        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={
            hasSubmitted && feErrors.confirmPassword
              ? { borderColor: "#e00707" }
              : {}
          }
        />

        {imageLoading && <span>Loading...</span>}

        <button className="signup-modal-button" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
