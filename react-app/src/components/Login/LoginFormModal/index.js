import React, { useState, useEffect } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const [feErrors, setFeErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(feErrors).length > 0) return;

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const demoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo1@user.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push("/");
    }
  };

  // frontend error handling
  useEffect(() => {
    let valErrors = {};

    if (email.length === 0) valErrors.email = "Email is required";
    if (password.length === 0) valErrors.password = "Password is required";

    setFeErrors(valErrors);
  }, [email, password]);

  return (
    <div className="log-in-modal-container">
      <form onSubmit={handleSubmit} className="log-in-modal-form">
        <h2>Log In</h2>
        {errors.map((error, idx) => (
          <span style={{ color: "#e00707" }} key={idx}>
            {error.split(":")[1]}
          </span>
        ))}
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={
            hasSubmitted && feErrors.email ? { borderColor: "#e00707" } : {}
          }
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={
            hasSubmitted && feErrors.password ? { borderColor: "#e00707" } : {}
          }
        />
        <button className="login-form-button" type="submit">
          Log In
        </button>
        <button
          className="demo-user-button"
          type="submit"
          onClick={(e) => demoSignIn(e)}
        >
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
