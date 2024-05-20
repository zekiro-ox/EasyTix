import { useState } from "react";
import "./App.css";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar";
import Home from "./Home.jsx";
import Event from "./Event.jsx";
import Messenger from "./Message.jsx";
import Audience from "./Audience.jsx";
import User from "./User.jsx";
import { getAuth, signOut } from "firebase/auth";
import app from "./config/firebase";
import AdminLoginPage from "./AdminLoginPage";

function App() {
  const [activeRoute, setActiveRoute] = useState("home");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const auth = getAuth();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleRouteChange = (route) => {
    setActiveRoute(route);
  };

  const handleLogout = () => {
    document.body.classList.add("sign-out-animation");
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} handleRouteChange={handleRouteChange} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        handleRouteChange={handleRouteChange}
        signOut={handleLogout}
      />
      {activeRoute === "home" && <Home />}
      {activeRoute === "event" && <Event />}
      {activeRoute === "message" && <Messenger />}
      {activeRoute === "audience" && <Audience />}
      {activeRoute === "user" && <User />}
    </div>
  );
}

export default App;
