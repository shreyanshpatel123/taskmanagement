import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/AssignTaskForm.css";

const AssignTaskForm = () => {
  const { userId } = useParams(); // Get user ID from URL
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/tasks/${userId}`, taskDetails);
      alert("Task assigned successfully!");
      setTaskDetails({
        title: "",
        description: "",
        dueDate: "",
      });
    } catch (error) {
      alert("Failed to assign task");
      console.error(error);
    }
  };

  return (
    <div className="assign-task-form">
      <h2>Assign Task</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AssignTaskForm;
