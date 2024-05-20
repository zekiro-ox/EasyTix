import React, { useState } from "react";
import { BsArrowRepeat } from "react-icons/bs";

function Venue() {
  const [showVenueDetails, setShowVenueDetails] = useState(false);
  const [venueName, setVenueName] = useState("");
  const [venueImage, setVenueImage] = useState(null);
  const [venues, setVenues] = useState([]);

  const handleShowVenueDetails = () => {
    setShowVenueDetails(true);
  };

  const handleAddVenue = () => {
    // Assuming you have a function to add the venue to your data source
    // For demonstration purposes, let's just update the state directly
    const newVenue = {
      name: venueName,
      image: venueImage,
    };
    setVenues([...venues, newVenue]);
    setVenueName(""); // Clear the input
    setVenueImage(null); // Clear the image
  };

  const handleDeleteVenue = (venueIndex) => {
    // Filter out the venue at the specified index
    const updatedVenues = venues.filter((_, index) => index !== venueIndex);
    setVenues(updatedVenues);
  };

  return (
    <div className="Venue">
      <div className="venue-form">
        <h1>Add Venue</h1>
        <input
          type="text"
          placeholder="Venue Name"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setVenueImage(e.target.files[0])}
          required
        />
        <button onClick={handleAddVenue}>Add Venue</button>
      </div>
      <div className="venue-grid">
        {venues.map((venue, index) => (
          <div key={index} className="venue-card">
            {venue.image && (
              <img src={URL.createObjectURL(venue.image)} alt={venue.name} />
            )}
            <h2>{venue.name}</h2>
            <button
              className="delete-btn"
              onClick={() => handleDeleteVenue(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Venue;
