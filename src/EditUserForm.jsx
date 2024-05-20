import React, { useState, useEffect } from "react";

function EditUserForm({ editingUser, onSave, onCancel }) {
  const [name, setName] = useState(editingUser.name);
  const [email, setEmail] = useState(editingUser.email);
  const [password, setPassword] = useState(editingUser.password);

  useEffect(() => {
    setName(editingUser.name);
    setEmail(editingUser.email);
    setPassword(editingUser.password);
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...editingUser, name, email, password });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="username"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="add" type="submit">
            Save
          </button>
          <button className="add" type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
