import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const RegistrarDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const events = [
    {
      id: 1,
      name: "Artificial Intelligence",
      description: "Explore the latest trends in AI and machine learning.",
      status: "On-going",
    },
    {
      id: 2,
      name: "Web Development Workshop",
      description: "Hands-on session for building modern web applications.",
      status: "Complete",
    },
    {
      id: 3,
      name: "Data Science Hackathon",
      description: "Compete to solve real-world data challenges.",
      status: "Complete",
    },
  ];

  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleLogout = () => {
    navigate("/registrar-login");
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = events.filter((e) => e.name.toLowerCase().includes(query));
    setFilteredEvents(filtered);
  };
  const handleEventClick = (eventId) => {
    navigate(`/registrar-panel/${eventId}`);
  };

  return (
    <div className="registrar-dashboard">
      <nav className="navbar">
        <h1>Registrar Panel</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Event"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>
      <div className="content">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <button
              onClick={() => handleEventClick(event.id)}
              className="on-going"
            >
              {event.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrarDashboard;
