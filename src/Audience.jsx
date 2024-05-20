import React, { useState } from "react";

function Audience() {
  const [searchText, setSearchText] = useState("");
  const [audiences, setAudiences] = useState([
    // Sample data
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      event: "Event 1",
      ticketType: "VIP",
      quantity: 2,
      amount: 200,
      status: "Registered",
    },
    // Other audience members...
  ]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredAudiences = audiences.filter((audience) =>
    audience.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="audience">
      <div className="audience-controls">
        <input
          type="text"
          placeholder="Search Audience"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <table className="audience-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
            <th>Ticket Type</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAudiences.map((audience) => (
            <tr key={audience.id}>
              <td>{audience.id}</td>
              <td>{audience.name}</td>
              <td>{audience.email}</td>
              <td>{audience.event}</td>
              <td>{audience.ticketType}</td>
              <td>{audience.quantity}</td>
              <td>₱ {audience.amount}</td>
              <td>{audience.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Audience;
