import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Task Management System</h1>
        <div className="home-buttons">
          <button onClick={() => navigate('/login')} className="home-button admin-button">
            Admin
          </button>
          <button onClick={() => navigate('/login')} className="home-button user-button">
            User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

