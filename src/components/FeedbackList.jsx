import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/FeedbackList.css";
import { FaChartLine, FaUser, FaMoneyBill, FaPills, FaCog } from "react-icons/fa";

const FEEDBACK_API_URL = "http://localhost:8080/api/feedback/all";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [activePage, setActivePage] = useState("customer-feedback");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(FEEDBACK_API_URL);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setErrorMessage("Failed to load feedbacks. Please try again later.");
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Pharmacy</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="/admin" onClick={() => setActivePage("dashboard")}>
              <FaChartLine /> Dashboard
            </a>
          </li>
          <li>
            <a href="/product-management" onClick={() => setActivePage("product-management")}>
              <FaMoneyBill /> Product Management
            </a>
          </li>
          <li>
            <a className="prescription" href="userprescription">
              <FaPills /> Prescription Management
            </a>
          </li>
          <li>
            <a href="/user">
              <FaUser /> User Management
            </a>
          </li>
          <li className="customer">
            <a href="/feedbacklist">
              <FaPills /> Customer Feedback Reports
            </a>
          </li>
          <li>
            <a href="#settings">
              <FaCog /> Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="feedback-report-container">
          <h2>Customer Feedback Reports</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {feedbacks.length > 0 ? (
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.userName}</td>
                    <td>{feedback.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No feedback available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default FeedbackList;
