
// AdminDashboard.js
import React , { useState } from "react";
import CreateUser from "./CreateUser";
import AssignTask from "./AssignTask";
import DisplayTasks from "./DisplayTask";
 import "../css/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("display");
  const adminName = "Shreyansh patel"; // Replace with dynamic admin data if needed
  const navigate=useNavigate();
   

  const handleBack = () => {
    navigate("/login");l // Navigate back to the previous page
  };
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Task Assigning System</h2>
        <ul>
          <li
            className={activePage === "createUser" ? "active" : ""}
            onClick={() => setActivePage("createUser")}
          >
            Create User
          </li>
          <li
            className={activePage === "assignTask" ? "active" : ""}
            onClick={() => setActivePage("assignTask")}
          >
            Assign Task
          </li>
          <li
            className={activePage === "display" ? "active" : ""}
            onClick={() => setActivePage("display")}
          >
            Display
          </li>
          <li   onClick={handleBack} >
            logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Admin, {adminName}</h1>
        </header>
        <div className="page-content">
          {activePage === "createUser" && <CreateUser />}
          {activePage === "assignTask" && <AssignTask />}
          {activePage === "display" && <DisplayTasks />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;





