import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AddEventForm from "./AddEventForm";
import EditEventForm from "./EditEventForm";
import ImageViewer from "./ImageViewer";
import dayjs from "dayjs";

function getFirstSentence(text) {
  const match = text.match(/[^.!?]+[.!?]/);
  return match ? match[0] : text;
}

function Event() {
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Event 1",
      description: "This is a description for Event 1.",
      startDate: new Date("2023-12-15"),
      endDate: new Date("2023-12-15"),
      startTime: dayjs("2023-12-15T10:00:00"),
      endTime: dayjs("2023-12-15T12:00:00"),
      venue: "Venue 1",
      ticketTypes: [
        { type: "General Admission", quantity: 100, price: 1500 },
        { type: "VIP", quantity: 50, price: 3000 },
      ],
      image: "src/assets/Manawari.jpg",
      seatMap: "src/assets/SEATMAP.png",
    },
  ]);

  const [imageViewUrl, setImageViewUrl] = useState(null); // State to manage image viewer modal

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, { id: events.length + 1, ...newEvent }];
    setEvents(updatedEvents);
    setShowAddEventForm(false);
  };

  const handleShowAddEventForm = () => {
    setShowAddEventForm(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewImage = (image) => {
    console.log("Image URL:", image);
    setImageViewUrl(image); // Set image URL for image viewer modal
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    setEditingEvent(eventToEdit);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const closeModal = () => {
    setEditingEvent(null);
    setImageViewUrl(null); // Close image viewer modal
  };
  const renderTicketTypes = (ticketTypes) => {
    return (
      <table>
        <tbody>
          {ticketTypes.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.type}</td>
              <td>{ticket.quantity}</td>
              <td>₱ {ticket.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const formatTime = (time) => {
    return dayjs(time).format("h:mm A");
  };
  const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  return (
    <main className="main-container">
      <div className="event">
        <div className="event-controls">
          <input
            type="text"
            placeholder="Search Events"
            value={searchText}
            onChange={handleSearch}
          />
          {!showAddEventForm && (
            <button className="add-icon" onClick={handleShowAddEventForm}>
              <IoIosAddCircle className="icon" />
              Add
            </button>
          )}
          {showAddEventForm && (
            <AddEventForm
              onAddEvent={handleAddEvent}
              onClose={() => setShowAddEventForm(false)}
            />
          )}
        </div>
        <table className="event-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="description-column">Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Venue</th>
              <th>Ticket Types</th>
              <th>Poster</th>
              <th>Seat Map</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td className="description-column history">
                  {getFirstSentence(event.description)}
                </td>
                <td>{formatDate(event.startDate)}</td>
                <td>{formatDate(event.endDate)}</td>
                <td>{formatTime(event.startTime)}</td>
                <td>{formatTime(event.endTime)}</td>
                <td>{event.venue}</td>
                <td>{renderTicketTypes(event.ticketTypes)}</td>
                <td>
                  {event.image ? (
                    <button
                      className="user-btn"
                      onClick={() => handleViewImage(event.image)}
                    >
                      View
                    </button>
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  {event.seatMap ? (
                    <button
                      className="user-btn"
                      onClick={() => handleViewImage(event.seatMap)}
                    >
                      View
                    </button>
                  ) : (
                    "No Seat Map"
                  )}
                </td>
                <td>
                  <button
                    className="user-btn"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEditEvent(event.id)}
                  >
                    <FaEdit className="icon" />
                    Edit
                  </button>
                  <button
                    className="user-btn"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <MdDeleteForever className="icon" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingEvent && (
        <EditEventForm
          editingEvent={editingEvent}
          onSave={(updatedEvent) => {
            const updatedEvents = events.map((event) =>
              event.id === editingEvent.id ? updatedEvent : event
            );
            setEvents(updatedEvents);
            setEditingEvent(null);
          }}
          onCancel={() => setEditingEvent(null)}
        />
      )}
      {imageViewUrl && (
        <ImageViewer image={imageViewUrl} onClose={closeModal} />
      )}
    </main>
  );
}

export default Event;
