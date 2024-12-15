import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminRegister from './pages/AdminRegister';
import AssignTask from './pages/AssignTask';

function App() {
  return (   <Router>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-admin" element={<AdminRegister />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/assign-task" element={<AssignTask />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      {/* Protected routes with Navbar */}
      <Route element={<Layout />}>
        <Route path="/user-dashboard" element={<UserDashboard />} />
       
      </Route>
    </Routes>
    </Router>
    
  );
}

export default App;



