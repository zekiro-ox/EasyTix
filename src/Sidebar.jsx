import React, { useState } from "react";
import { BsGrid1X2Fill, BsPeopleFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";
import { BsCalendarEvent } from "react-icons/bs";
import { FaUserGear } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { BsArrowDownLeftSquare } from "react-icons/bs";

function Sidebar({
  openSidebarToggle,
  OpenSidebar,
  handleRouteChange,
  signOut,
}) {
  const [activeRoute, setActiveRoute] = useState("home");

  const handleRouteChangeLocal = (screen, route, activeRoute) => {
    screen.preventDefault();
    setActiveRoute(route);
    handleRouteChange(route, activeRoute);
  };
  const handleLogout = () => {
    signOut();
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <RiAdminFill className="icon_header" /> Admin
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <BsArrowDownLeftSquare className="icon" />
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a
            href="Home"
            onClick={(screen) => handleRouteChangeLocal(screen, "home", "home")}
            className={activeRoute === "home" ? "active" : ""}
          >
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            href="Event"
            onClick={(screen) =>
              handleRouteChangeLocal(screen, "event", "event")
            }
            className={activeRoute === "event" ? "active" : ""}
          >
            <BsCalendarEvent className="icon" /> Events
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            href="Message"
            onClick={(screen) =>
              handleRouteChangeLocal(screen, "message", "message")
            }
            className={activeRoute === "message" ? "active" : ""}
          >
            <FaRegMessage className="icon" /> Message
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            href="Audience"
            onClick={(screen) =>
              handleRouteChangeLocal(screen, "audience", "audience")
            }
            className={activeRoute === "audience" ? "active" : ""}
          >
            <BsPeopleFill className="icon" /> User
          </a>
        </li>
        <li className="sidebar-list-item">
          <a
            href="Users"
            onClick={(screen) => handleRouteChangeLocal(screen, "user", "user")}
            className={activeRoute === "user" ? "active" : ""}
          >
            <FaUserGear className="icon" /> Organizer
          </a>
        </li>
        <li className="sidebar-list-item">
          <button onClick={handleLogout}>
            <HiOutlineLogout className="icon" />
            LOGOUT
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
