import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./App.css";

const AdminLoginPage = ({ onLogin }) => {
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in successfully!");
      onLogin(event);
    } catch (error) {
      setLoginError(error.message);
      alert("Error logging in: Incorrect email or password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="admin-login-page">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />
          <div className="password-container">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
            />
            <button
              onClick={togglePasswordVisibility}
              type="button"
              className="view-icon"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <br />
          <button type="submit">Login</button>
          <article>
            Registrar?{" "}
            <Link
              to="/registrar-login"
              style={{ cursor: "pointer", color: "blue" }}
            >
              Click Here
            </Link>
          </article>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
