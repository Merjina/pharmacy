import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Home.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/browseproducts"); // Make sure your route path is correct
  };

  return (
    <div>
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1>WELCOME TO <span className="highlight">BONVEN MEDICALS</span></h1>
            <p>Your Trusted Online Pharmacy</p>
            <button className="btn btn-warning" onClick={() => navigate("/")}>Shop Now</button>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
