
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Pagination, Button } from "react-bootstrap";
import '../css/UserDashboard.css';  // Import the CSS file

const UserDashboard = () => {
  const location = useLocation();
  const userId = location.state?.userId; // Access userId from state
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const navigate = useNavigate();

  // Fetch tasks for the logged-in user
  useEffect(() => {
    const fetchUserTasks = async () => {
      if (!userId) {
        console.error("User ID not found");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/tasks/getUserTasks/${userId}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };
    fetchUserTasks();
  }, [userId]);

  // Handle status update
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/tasks/updateTaskStatus/${taskId}`, {
        status: newStatus,
      });
      alert("Task status updated successfully!");
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      alert("Failed to update task status");
      console.error(error);
    }
  };

  // Get the tasks for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logout function
  const handleLogout = () => {
    // Clear user authentication data from localStorage or sessionStorage
    localStorage.removeItem("authToken"); // Adjust based on where your token is stored

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="user-dashboard-container">
      <h2>Your Tasks</h2>
      <Button variant="danger" onClick={handleLogout} className="logout-btn">
        Logout
      </Button>

      {tasks.length === 0 ? (
        <p>No tasks found!</p>
      ) : (
        <>
          <Table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task._id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
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
        </>
      )}
    </div>
  );
};

export default UserDashboard;


