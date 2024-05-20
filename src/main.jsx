import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import AdminLoginPage from "./AdminLoginPage";
import RegistrarLoginPage from "./RegistrarLoginPage";
import RegistrarDashboard from "./RegistrarDashboard";
import RegistrarPanel from "./RegistrarPanel";
import NotFoundPage from "./NotFoundPage";
import App from "./App";
import "./App.css";
import app from "./config/firebase";

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  return (
    <BrowserRouter>
      <div>
        {isLoading ? (
          <div className="container">
            <h1 className="loading-message">Logging in</h1>
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {isLoggedIn ? (
              <App signOut={handleLogout} />
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={<AdminLoginPage onLogin={handleLogin} />}
                />
                <Route
                  path="/registrar-login"
                  element={<RegistrarLoginPage onLogin={handleLogin} />}
                />
                <Route
                  path="/registrar-dashboard"
                  element={<RegistrarDashboard />}
                />
                <Route
                  path="/registrar-panel/:id"
                  element={<RegistrarPanel />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            )}
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

export default AppWrapper;
