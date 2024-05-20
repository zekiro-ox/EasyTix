import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import AddUserForm from "./AddUserForm"; // Import the AddUserForm component
import EditUserForm from "./EditUserForm"; // Import the EditUserForm component

function User() {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
    { id: 3, name: "William Johnson", email: "williamj@example.com" },
  ]);

  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, { id: users.length + 1, ...newUser }];
    setUsers(updatedUsers);
    setShowAddUserForm(false);
  };

  const handleShowAddUserForm = () => {
    setShowAddUserForm(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUser(userToEdit);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const closeModal = () => {
    setEditingUser(null);
  };

  return (
    <main className="main-container">
      <div className="user">
        <div className="user-controls">
          <input
            type="text"
            placeholder="Search Users"
            value={searchText}
            onChange={handleSearch}
          />
          {!showAddUserForm && (
            <button className="add-btn-user" onClick={handleShowAddUserForm}>
              <IoPersonAdd className="icon" />
              Add
            </button>
          )}
          {showAddUserForm && (
            <AddUserForm
              onAddUser={handleAddUser}
              onClose={() => setShowAddUserForm(false)}
            />
          )}
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="user-btn"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEditUser(user.id)}
                  >
                    <FaEdit className="icon" />
                    Edit
                  </button>
                  <button
                    className="user-btn"
                    onClick={() => handleDeleteUser(user.id)}
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
      {editingUser && (
        <EditUserForm
          editingUser={editingUser}
          onSave={(updatedUser) => {
            const updatedUsers = users.map((user) =>
              user.id === editingUser.id ? updatedUser : user
            );
            setUsers(updatedUsers);
            setEditingUser(null);
          }}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </main>
  );
}

export default User;
