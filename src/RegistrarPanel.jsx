import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./App.css";

const RegistrarPanel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      ticketType: "VIP",
    },
    // ... other participants
  ]);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (showScanner) {
      const html5QrCode = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      const onScanSuccess = (decodedText, decodedResult) => {
        console.log(`Code matched = ${decodedText}`, decodedResult);
        setShowScanner(false); // Close scanner after successful scan
      };
      const onScanFailure = (error) => {
        console.warn(`Code scan error = ${error}`);
      };
      html5QrCode.render(onScanSuccess, onScanFailure);

      return () => {
        html5QrCode.clear();
      };
    }
  }, [showScanner]);

  const handleBackToDashboard = () => {
    navigate("/registrar-dashboard");
  };

  const handleScanQR = () => {
    setShowScanner(true);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <div className="registrar-panel-container">
      <nav className="navbar">
        <div className="profile-icon"></div>
        <h1>Event Registration</h1>
        <div className="nav-buttons">
          <button onClick={handleBackToDashboard} className="back-button">
            Back
          </button>
          <button onClick={handleScanQR} className="scan-qr-button">
            Scan Ticket
          </button>
        </div>
      </nav>
      <div className="registrar-controls">
        <input
          type="text"
          placeholder="Search"
          className="search-participants"
        />
      </div>
      <table className="registrar-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Ticket Type</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>{participant.ticketType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showScanner && (
        <div className="modal-overlay-qr">
          <div className="modal-content-qr">
            <button onClick={handleCloseScanner} className="close-button">
              Close
            </button>
            <div id="qr-reader" style={{ width: "500px" }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarPanel;
