import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./App.css";

const RegistrarLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const preMadeEmail = "registrar@example.com";
  const preMadePassword = "password123";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email === preMadeEmail && password === preMadePassword) {
      setIsLoading(true);
      console.log("Logged in successfully!");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/registrar-dashboard");
      }, 2000);
    } else {
      setLoginError("Incorrect email or password.");
      alert("Error logging in: Incorrect email or password.");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      {isLoading ? (
        <div className="container">
          <h1 className="loading-message">Logging in</h1>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="admin-login-page">
          <h1>Organizer Login</h1>
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
              Admin?{" "}
              <Link to="/" style={{ cursor: "pointer", color: "blue" }}>
                Click Here
              </Link>
            </article>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrarLoginPage;
