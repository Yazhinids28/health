import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';


const HeroSection = () => {
  return (
	
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to We Grow</h1>
        <p>Your journey toward a healthy lifestyle begins here.</p>
        <Link to="/login" className="get-started-btn">Get Started</Link>
      </div>
    </div>
  );
};

export default HeroSection;
