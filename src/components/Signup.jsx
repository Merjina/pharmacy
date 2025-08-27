import React, { useState } from "react";
import { registerUser } from "../services/Api"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "",  
    password: "", 
    confirmPassword: "", 
  }); 

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.id]: e.target.value }); 
  }; 

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError("");

    if (!validatePhone(formData.phone)) {
      setError("Invalid phone number. Please enter a 10-digit number.");
      return;
    }
  
    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) { 
      setError("Passwords do not match!");
      return; 
    }
  
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };
  
    try { 
      setLoading(true);
      const response = await registerUser(userData);
      alert(response.message);
      setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
    } catch (error) { 
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="signup-container">
      <div className="signup-box">
        {error && <p className="text-danger">{error}</p>}
        
        <h1 className="signup-header">SIGN UP</h1>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="signup-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="signup-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone" className="signup-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="signup-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword" className="signup-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          
          <p className="signup-paragraph">
            Already have an account? <a href="/">Login Here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
