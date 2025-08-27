import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChartLine, FaUser, FaMoneyBill, FaPills, FaCog } from "react-icons/fa";
import "../styles/Admin.css";
import "../styles/User.css";
import "../styles/UserPrescription.css";

const UserPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [userEmail, setUserEmail] = useState("user@example.com"); // Replace with actual user email (you can get from JWT)

  useEffect(() => {
    fetchUserPrescriptions();
  }, []);

  const fetchUserPrescriptions = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming JWT is stored in localStorage
      const response = await axios.get("http://localhost:8080/api/prescriptions/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handlePayment = (id, amount) => {
    alert(`Redirect to payment page for ID: ${id} | Amount: ₹${amount}`);
    // You can navigate to payment page here using useNavigate()
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Pharmacy</h2>
        </div>
        <ul className="sidebar-menu">
          <li><a href="/admin"><FaChartLine /> Dashboard</a></li>
          <li><a href="/product-management"><FaMoneyBill /> Product Management</a></li>
          <li className="prescription"><a href="/userprescription"><FaPills /> Prescription Management</a></li>
          <li><a href="/user"><FaUser /> User Management</a></li>
          <li><a className="customer" href="/feedbacklist"><FaPills /> Customer Feedback Reports</a></li>
          <li><a href="#settings"><FaCog /> Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="user-list-container">
          <h2>All User Prescriptions</h2>
          {prescriptions.length === 0 ? (
            <p>No prescriptions uploaded.</p>
          ) : (
            <table className="prescription-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Document</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Amount (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((pres) => (
                  <tr key={pres.id}>
                    <td>{pres.id}</td>
                    <td>
                      <a
                        href={`http://localhost:8080/${pres.filePath}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>{pres.name}</td>
                    <td>{pres.email}</td>
                    <td style={{ color: pres.approved ? "green" : "red" }}>
                      {pres.approved ? "Approved" : "Pending"}
                    </td>
                    <td>{pres.amount ? pres.amount : "-"}</td>
                    <td>
                      {pres.approved && pres.amount ? (
                        <button
                          className="pay-btn"
                          onClick={() => handlePayment(pres.id, pres.amount)}
                        >
                          Pay
                        </button>
                      ) : (
                        <span>Not Ready</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPrescriptions;
