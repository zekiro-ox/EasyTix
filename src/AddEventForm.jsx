import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function AddEventForm({ onAddEvent, onClose }) {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: dayjs(),
    endTime: dayjs(),
    venue: "",
    image: "",
    seatMap: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "seatMap") {
      const file = files[0];
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: file,
      }));
    } else {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }
  };

  const handleStartDateChange = (date) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      endDate: date,
    }));
  };

  const handleStartTimeChange = (newValue) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      startTime: newValue,
    }));
  };

  const handleEndTimeChange = (newValue) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      endTime: newValue,
    }));
  };

  const handleTicketTypeChange = (index, field, value) => {
    const updatedTicketTypes = ticketTypes.map((ticket, i) => {
      if (i === index) {
        return { ...ticket, [field]: value };
      }
      return ticket;
    });
    setTicketTypes(updatedTicketTypes);
  };

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { type: "", quantity: "", price: "" }]);
  };

  const removeTicketType = (index) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      ...newEvent,
      ticketTypes,
    });

    setNewEvent({
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: dayjs(),
      endTime: dayjs(),
      venue: "",
      image: "",
      seatMap: "",
    });
    setTicketTypes([]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="name"
              value={newEvent.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="eventDescription">Event Description:</label>
            <textarea
              id="eventDescription"
              name="description"
              value={newEvent.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="eventStartDate">Event Start Date:</label>
            <DatePicker
              id="eventStartDate"
              selected={newEvent.startDate}
              onChange={handleStartDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </div>

          <div>
            <label htmlFor="eventEndDate">Event End Date:</label>
            <DatePicker
              id="eventEndDate"
              selected={newEvent.endDate}
              onChange={handleEndDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div>
            <label htmlFor="eventStartTime">Event Start Time:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={newEvent.startTime}
                onChange={handleStartTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <label htmlFor="eventEndTime">Event End Time:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={newEvent.endTime}
                onChange={handleEndTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <label htmlFor="eventVenue">Event Venue:</label>
            <input
              type="text"
              id="eventVenue"
              name="venue"
              value={newEvent.venue}
              onChange={handleChange}
              required
            />
          </div>

          {ticketTypes.map((ticket, index) => (
            <div key={index} className="ticket-type-section">
              <label htmlFor={`ticketType-${index}`}>Ticket Type:</label>
              <input
                type="text"
                id={`ticketType-${index}`}
                value={ticket.type}
                onChange={(e) =>
                  handleTicketTypeChange(index, "type", e.target.value)
                }
                required
              />
              <label htmlFor={`ticketQuantity-${index}`}>Quantity:</label>
              <input
                type="number"
                id={`ticketQuantity-${index}`}
                value={ticket.quantity}
                onChange={(e) =>
                  handleTicketTypeChange(index, "quantity", e.target.value)
                }
                required
              />
              <label htmlFor={`ticketPrice-${index}`}>Price:</label>
              <input
                type="number"
                id={`ticketPrice-${index}`}
                value={ticket.price}
                onChange={(e) =>
                  handleTicketTypeChange(index, "price", e.target.value)
                }
                required
              />
              <button
                className="add"
                type="button"
                onClick={() => removeTicketType(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="add" type="button" onClick={addTicketType}>
            Add Ticket Type
          </button>
          <div>
            <label htmlFor="eventImage">Event Poster:</label>
            <input
              type="file"
              id="eventImage"
              name="image"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="eventSeatMap">Event Seat Map:</label>
            <input
              type="file"
              id="eventSeatMap"
              name="seatMap"
              onChange={handleChange}
            />
          </div>
          <div className="button-container">
            <button className="add" type="submit">
              Add Event
            </button>
            <button className="add" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventForm;
