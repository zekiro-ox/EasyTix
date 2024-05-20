import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function EditEventForm({ editingEvent, onSave, onCancel }) {
  const [editedEvent, setEditedEvent] = useState({
    ...editingEvent,
    description: editingEvent.description || "",
    startDate: new Date(editingEvent.startDate),
    endDate: new Date(editingEvent.endDate),
    startTime: dayjs(editingEvent.startTime),
    endTime: dayjs(editingEvent.endTime),
    seatMap: editingEvent.seatMap || "",
    image: editingEvent.image || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "seatMap") {
      const file = files ? files[0] : null;
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        [name]: file,
      }));
    } else {
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }
  };

  const handleStartDateChange = (date) => {
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      endDate: date,
    }));
  };

  const handleStartTimeChange = (newValue) => {
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      startTime: newValue,
    }));
  };

  const handleEndTimeChange = (newValue) => {
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      endTime: newValue,
    }));
  };
  const handleTicketTypeChange = (index, field, value) => {
    const updatedTicketTypes = editedEvent.ticketTypes.map((ticket, i) => {
      if (i === index) {
        return { ...ticket, [field]: value };
      }
      return ticket;
    });
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      ticketTypes: updatedTicketTypes,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...editedEvent,
      startDate: editedEvent.startDate,
      endDate: editedEvent.endDate,
      startTime: editedEvent.startTime.format(),
      endTime: editedEvent.endTime.format(),
      description: editedEvent.description,
      image: editedEvent.image,
      seatMap: editedEvent.seatMap,
      ticketTypes: editedEvent.ticketTypes.map((ticket) => ({
        ...ticket,
        price: parseFloat(ticket.price),
      })),
    });
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="name"
              value={editedEvent.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="eventDescription">Event Description:</label>
            <textarea
              id="eventDescription"
              name="description"
              value={editedEvent.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="eventStartDate">Event Start Date:</label>
            <DatePicker
              id="eventStartDate"
              selected={editedEvent.startDate}
              onChange={handleStartDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div>
            <label htmlFor="eventEndDate">Event End Date:</label>
            <DatePicker
              id="eventEndDate"
              selected={editedEvent.endDate}
              onChange={handleEndDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div>
            <label htmlFor="eventStartTime">Event Start Time:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={editedEvent.startTime}
                onChange={handleStartTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div>
            <label htmlFor="eventEndTime">Event End Time:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={editedEvent.endTime}
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
              value={editedEvent.venue}
              onChange={handleChange}
              required
            />
          </div>
          {editedEvent.ticketTypes.map((ticket, index) => (
            <div key={index}>
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
            </div>
          ))}
          <div>
            <label htmlFor="eventImage">Event Poster:</label>
            <input
              type="file"
              id="eventImage"
              name="Image"
              onChange={handleChange}
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
              Save
            </button>
            <button className="add" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventForm;
