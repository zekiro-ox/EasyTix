import React, { useState } from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs";

function getFirstSentence(text) {
  const match = text.match(/[^.!?]+[.!?]/);
  return match ? match[0] : text;
}

function Messenger() {
  // Example initial messages
  const [messages, setMessages] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      message: "I have an issue paying my ticket.",
      reply: "We are looking into this issue and will get back to you shortly.",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      message: "I can't view the event poster",
      reply: "",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMessageIndex, setActiveMessageIndex] = useState(null);
  const [reply, setReply] = useState("");

  const handleSendMessage = () => {
    if (activeMessageIndex != null) {
      const updatedMessages = messages.map((msg, index) =>
        index === activeMessageIndex ? { ...msg, reply } : msg
      );
      setMessages(updatedMessages);
      // Reset the reply field and hide the modal
      setReply("");
      setActiveMessageIndex(null);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReplyClick = (index) => {
    setActiveMessageIndex(index);
    // Set the reply to the existing reply if there is one
    setReply(messages[index].reply || "");
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Messenger">
      <input
        type="text"
        className="search-message"
        placeholder="Search Messages"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="message-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th className="Message-column">Message</th>
            <th>Action</th>
            <th className="Message-column">History</th>
          </tr>
        </thead>
        <tbody>
          {filteredMessages.map((msg, index) => (
            <tr key={index}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td className="Message-column">
                {getFirstSentence(msg.message)}
              </td>
              <td>
                <button
                  className="reply-btn"
                  onClick={() => handleReplyClick(index)}
                >
                  <BsFillSendArrowUpFill className="icon" />
                  Send
                </button>
              </td>
              <td className="history Message-column">
                {getFirstSentence(msg.reply)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {activeMessageIndex != null && (
        <div className="modal-overlay">
          <div className="modal">
            <textarea
              placeholder="Type your reply here..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
            <button onClick={() => setActiveMessageIndex(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messenger;
