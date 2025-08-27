// src/components/Footer.jsx
import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-section">
          <h3>PharmacyPlus</h3>
          <p>
            Your trusted online pharmacy, delivering quality medicines and
            healthcare services at your convenience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@pharmacyplus.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Health St, MedCity, USA</p>
        </div>

        {/* Social Media Links using Bootstrap Icons */}
        <div className="footer-section social-icons">
          <h3>Follow Us</h3>
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-twitter"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-linkedin"></i></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 PharmacyPlus. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
