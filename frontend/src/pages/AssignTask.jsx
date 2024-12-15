

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AssignTask.css";

const AssignTask = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Stores the selected user's data
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium", // Default priority
  });

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/display-user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle assign task button click
  const handleAssignTaskClick = (user) => {
    setSelectedUser(user); // Store the selected user
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/tasks/createTask/${selectedUser._id}`, // Use selectedUser._id
        taskDetails
      );
      alert("Task assigned successfully!");
      setTaskDetails({ title: "", description: "", dueDate: "", priority: "Medium" }); // Reset the form
      setSelectedUser(null); // Go back to the user table
    } catch (error) {
      alert("Failed to assign task");
      console.error(error);
    }
  };
  

  return (
    <div className="assign-task">
      {selectedUser ? (
        // Render Task Assignment Form
        <div className="assign-task-form">
          <h2>Assign Task to {selectedUser.username}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={taskDetails.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={taskDetails.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={taskDetails.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Priority:</label>
              <select
                name="priority"
                value={taskDetails.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setSelectedUser(null)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        // Render User Table
        <div>
          <h2>Assign Task</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleAssignTaskClick(user)}>Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignTask;


