import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Staff.css";

const PRODUCT_API_URL = "http://localhost:8080/api/products";
const PRESCRIPTION_API_URL = "http://localhost:8080/api/prescriptions";
const NOTIFICATION_API_URL = "http://localhost:8080/api/notifications";
const CHAT_API_URL = "http://localhost:8080/api/help";
const USERS_API_URL = "http://localhost:8080/api/users";

const Staff = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [emailToUserIdMap, setEmailToUserIdMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [approvalAmountsById, setApprovalAmountsById] = useState({}); // NEW

  useEffect(() => {
    fetchStockDetails();
    fetchPrescriptions();
    fetchUsers();
    fetchChatMessages();
  }, []);

  const fetchStockDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${PRODUCT_API_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStockDetails(response.data);
    } catch (error) {
      console.error("Error fetching stock details:", error);
      setError("Failed to fetch stock details.");
    }
    setLoading(false);
  };

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${PRESCRIPTION_API_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${USERS_API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userMap = {};
      response.data.forEach((user) => {
        userMap[user.email] = user.id;
      });
      setEmailToUserIdMap(userMap);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${CHAT_API_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChat(response.data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const handleApprovePrescription = async (prescriptionId) => {
    const amount = approvalAmountsById[prescriptionId];
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = { amount: parseFloat(amount) };
      await axios.post(
        `${PRESCRIPTION_API_URL}/approve/${prescriptionId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Prescription approved successfully!");
      setApprovalAmountsById((prev) => {
        const updated = { ...prev };
        delete updated[prescriptionId];
        return updated;
      });
      fetchPrescriptions();
    } catch (error) {
      console.error("Error approving prescription:", error);
      alert("Failed to approve prescription.");
    }
  };

  const handleDeletePrescription = async (prescriptionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${PRESCRIPTION_API_URL}/delete/${prescriptionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Prescription deleted successfully!");
      fetchPrescriptions();
    } catch (error) {
      console.error("Error deleting prescription:", error);
      alert("Failed to delete prescription.");
    }
  };

  const handleSendNotification = async (product) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${NOTIFICATION_API_URL}/send`,
        { productName: product.productName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Notification sent to admin successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedEmail) {
      alert("Please select a user and enter a message.");
      return;
    }

    const receiverId = emailToUserIdMap[selectedEmail];
    if (!receiverId) {
      alert("User ID not found for the selected email.");
      return;
    }

    const payload = {
      sender: "staff",
      content: message,
      chat: {
        user: { id: receiverId },
      },
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${CHAT_API_URL}/message`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setChat((prev) => [...prev, response.data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error?.response || error.message);
      alert("Failed to send message.");
    }
  };

  const getDocumentUrl = (filePath) =>
    filePath ? `http://localhost:8080/uploads${filePath.split("uploads")[1]}` : "";

  return (
    <div className="staff-container">
      <div className="staff-dashboard">
        <h2 className="dashboard-title">Staff Dashboard</h2>
        <div className="dashboard-grid">
          {/* Prescription Verification */}
          <div className="dashboard-section prescription-section">
            <h3 className="section-title">Prescription Verification</h3>
            <table className="prescription-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Document</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription) => (
                  <tr key={prescription.id}>
                    <td>{prescription.id}</td>
                    <td>
                      {prescription.filePath ? (
                        <a
                          href={getDocumentUrl(prescription.filePath)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Document
                        </a>
                      ) : (
                        "No Document"
                      )}
                    </td>
                    <td>{prescription.name}</td>
                    <td>{prescription.email}</td>
                    <td
                      className={prescription.approved ? "status-approved" : "status-pending"}
                    >
                      {prescription.approved ? "✅ Approved" : "⏳ Pending"}
                    </td>
                    <td>
                      {prescription.approved ? (
                        `₹${prescription.amount}`
                      ) : (
                        <input
                          type="number"
                          value={approvalAmountsById[prescription.id] || ""}
                          onChange={(e) =>
                            setApprovalAmountsById((prev) => ({
                              ...prev,
                              [prescription.id]: e.target.value,
                            }))
                          }
                          placeholder="Enter amount"
                        />
                      )}
                    </td>
                    <td>
                      {!prescription.approved && (
                        <button
                          className="btn approve-btn"
                          onClick={() => handleApprovePrescription(prescription.id)}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        className="btn delete-btn"
                        onClick={() => handleDeletePrescription(prescription.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stock Management */}
          <div className="dashboard-section stock-section">
            <h3 className="section-title">Stock Management</h3>
            {loading && <p className="loading-text">Loading stock details...</p>}
            {error && <p className="error-text">{error}</p>}
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock Available</th>
                </tr>
              </thead>
              <tbody>
                {stockDetails.map((product) => (
                  <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>₹{product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chat Section */}
          <div className="dashboard-section chat-section">
            <h3 className="section-title">Chat with User</h3>
            <div>
              <label>Select User Email:</label>
              <select
                value={selectedEmail}
                onChange={(e) => setSelectedEmail(e.target.value)}
              >
                <option value="">-- Choose Email --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
              <br />
              <input
                type="text"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h4>Messages:</h4>
              {chat.length > 0 ? (
                chat
                  .filter((msg) => emailToUserIdMap[selectedEmail] === msg.chat.user.id)
                  .map((msg) => (
                    <div key={msg.id}>
                      <p>
                        <strong>{msg.sender === "staff" ? "Staff" : "User"}:</strong> {msg.content}
                      </p>
                    </div>
                  ))
              ) : (
                <p>No messages yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
