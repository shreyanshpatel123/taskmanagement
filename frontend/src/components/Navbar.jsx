import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={{ ...styles.link, ...styles.homeLink }}>Home</Link>
      <Link to="/register-admin" style={styles.link}>Admin Register</Link>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor:'rgb(19, 19, 18)' , // Deep black for a clean look
    padding: '15px 30px', // Comfortable spacing
    display: 'flex',
    justifyContent: 'space-between', // Spread out links
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(8, 8, 8, 0.1)', // Subtle shadow for depth
  },
  link: {
    color: '#fff', // White text for high contrast
    textDecoration: 'none', // Remove underline
    fontSize: '18px', // Larger font for readability
    fontWeight: '500', // Slightly bold for emphasis
    padding: '8px 16px', // Padding for clickable area
    borderRadius: '4px', // Rounded corners for a modern feel
    transition: 'background-color 0.3s ease', // Smooth hover effect
  },
  homeLink: {
    backgroundColor: '#007bff', // Blue for "Home"
    color: '#fff', // White text on blue background
  },
  linkHover: {
    backgroundColor: '#444', // Hover effect
  },
};

export default Navbar;








