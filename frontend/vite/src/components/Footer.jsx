import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <strong>We Grow 🍅</strong>
          <p>© 2023 PVT. LTD. All Rights Reserved.</p>
        </div>
        <div className="footer-icons">
          <span>📷</span>
          <span>🐦</span>
          <span>📌</span>
          <span>🎥</span>
          <span>✉️</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
