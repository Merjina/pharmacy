import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";
import { 
  FaChartLine, 
  FaUser, 
  FaMoneyBill, 
  FaPills, 
  FaCog 
} from "react-icons/fa";
import Product from "./Product";
import FeedbackList from "./FeedbackList"; 

const Admin = () => {  // Removed totalCustomers prop
  const [activePage, setActivePage] = useState("dashboard");
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    fetchTotalCustomers();
  }, []);

  const fetchTotalCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/customers/total");
  
      if (Array.isArray(response.data)) {
        // If API returns an array, filter out admins and count the rest
        const nonAdminUsers = response.data.filter(user => user.role !== "ADMIN");
        setTotalCustomers(nonAdminUsers.length);
      } else if (typeof response.data === "number") {
        // If API directly returns a number (total users count excluding admins)
        setTotalCustomers(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
      
    } catch (error) {
      console.error("Error fetching total customers:", error);
    }
  };
  
  

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Pharmacy</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activePage === "dashboard" ? "active" : ""}>
            <a href="/dashboard" onClick={() => setActivePage("dashboard")}>
              <FaChartLine /> Dashboard
            </a>
          </li>
          
          <li className={activePage === "product-management" ? "active" : ""}>
            <a href="product-management">
              <FaMoneyBill /> Product Management
            </a>
          </li>

          {/* Prescription Management */}
          <li>
            <a className="prescription" href="userprescription">
              <FaPills /> Prescription Management
            </a>
          </li>

          {/* User Management */}
          <li>
            <a href="/user">
              <FaUser /> User Management
            </a>
          </li>

          {/* Customer Feedback Reports */}
          <li>
            <a className="customer" href="feedbacklist">
              <FaPills /> Customer Feedback Reports
            </a>
          </li>

          {/* Settings */}
          <li>
            <a href="#settings">
              <FaCog /> Settings
            </a>
          </li>
        </ul>
      </aside>
        
      {/* Main Content */}
      <main className="admin-main">
        {/* Dashboard */}
        {activePage === "dashboard" && (
          <>
            <div className="admin-header">
              <h1>Dashboard</h1>
              <p>Welcome to Pharmacy Dashboard Template.</p>
            </div>
            <div className="dashboard-cards">
              <div className="card">
                <h3>Total Customers</h3>
                <p className="amount">{totalCustomers}</p> 
                <p className="sub-text">+3.1% vs last week</p>
              </div>
            </div>
          </>
        )}

        {/* Product Management Page */}
        {activePage === "product-management" && <Product />}
        {activePage === "customer-feedback" && <FeedbackList />}
      </main>
    </div>
  );
};

export default Admin;
