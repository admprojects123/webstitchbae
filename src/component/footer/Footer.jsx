// Footer.jsx
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa'; // Import Instagram icon

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-columns">
        <div className="footer-section">
          <h4>CONTACT US</h4>
          <p>+91 9923446236</p>
          <p>info@stitchbae.com</p>
          <p>Mon–Fri 9am-3pm PT</p>
        </div>

        <div className="footer-section">
          <h4>COMPANY</h4>
          <p><Link to="/about-us" className="footer-link">About Us</Link></p>
          <p><Link to="/contact-us" className="footer-link">Contact Us</Link></p>
        </div>

        <div className="footer-section subscribe-section">
          <h4>Get the latest new from us</h4>
          <input type="email" placeholder="Enter your email address" />
          <p className="policy-text">
            By signing up, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.
          </p>
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>@Stitchbein</p>
        <a
          href="https://www.instagram.com/wearstitchbae"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
        >
          <FaInstagram className="instagram-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
