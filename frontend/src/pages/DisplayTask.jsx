import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination } from "react-bootstrap";
import '../css/DisplayTasks.css'; 
import '../css/EditTaskForm.css';

const DisplayTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); // State to store the task being edited
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks/getAllTasks");
        const sortedTasks = response.data.sort((a, b) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        setTasks(sortedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Handle Edit button click
  const handleEditClick = (task) => {
    setEditTask(task); // Set the selected task for editing
    setEditForm({
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().split("T")[0],
      priority: task.priority,
      status: task.status,
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to update the task
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/updateTask/${editTask._id}`,
        editForm
      );
      alert("Task updated successfully!");
      // Update the tasks state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editTask._id ? { ...task, ...editForm } : task
        )
      );
      setEditTask(null); // Close the edit form
    } catch (error) {
      alert("Failed to update task");
      console.error(error);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditTask(null); // Close the edit form
  };

  // Handle Delete
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/deleteTask/${taskId}`);
      alert("Task deleted successfully!");
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert("Failed to delete task");
      console.error(error);
    }
  };

  // Get the tasks for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get row CSS class based on priority
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "high-priority";
      case "Medium":
        return "medium-priority";
      case "Low":
        return "low-priority";
      default:
        return "";
    }
  };

  return (
    <div className="display-tasks">
      {editTask ? (
        // Edit Task Form
        <div className="edit-task-form">
          <h2>Edit Task</h2>
          <form onSubmit={handleEditSubmit}>
            <div>
                 <label>Title:</label><input type="text" name="title" value={editForm.title} onChange={handleInputChange} required />
            </div>
            <div>
               <label>Description:</label> <textarea name="description"  value={editForm.description}  onChange={handleInputChange}  required
   />
            </div>
            <div>
              <label>Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={editForm.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Priority:</label>
              <select
                name="priority"
                value={editForm.priority}
                onChange={handleInputChange}
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={editForm.status}
                onChange={handleInputChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        // Display Task Table
        <div>
          <h2>Task Management</h2>
          <Table className="task-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Title</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task._id} className={getPriorityClass(task.priority)}>
                  <td>{task.assignedTo.username}</td>
                  <td>{task.assignedTo.email}</td>
                  <td>{task.title}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <Pagination>
            {[...Array(Math.ceil(tasks.length / tasksPerPage))].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DisplayTasks;
