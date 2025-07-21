import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/Logo.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    // your real logout logic...
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="logo-section">
        <img src={logo} alt="We Grow Logo" className="logo" />
        <span className="site-name">We Grow</span>
      </div>

      <nav className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/remedies">Our Plans</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
