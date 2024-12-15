import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; 


const Login = () => {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        role,
        username,
        password,
      });
      alert(response.data.message);

      const { userId } = response.data;

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard", { state: { userId } });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <select
          className="login-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <button onClick={handleBack} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
};

export default Login;



