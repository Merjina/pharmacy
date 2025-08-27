import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaUser, FaMoneyBill, FaPills, FaCog } from "react-icons/fa";
import "../styles/Admin.css";
import "../styles/User.css";

function User({ updateTotalCustomers }) {  // Accepting the prop here
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/all");
      const nonAdminUsers = response.data.filter(
        (user) => user.role !== "ADMIN" && user.role !== "STAFF"
      );
       setUsers(nonAdminUsers);
      updateTotalCustomers(nonAdminUsers.length); // Updating total customer count
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/auth/delete/${id}`);
      fetchUsers(); // Refresh users list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
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
          <li>
            <a href="/admin">
              <FaChartLine /> Dashboard
            </a>
          </li>
          <li>
            <a href="/product-management">
              <FaMoneyBill /> Product Management
            </a>
          </li>
          <li>
            <a className="prescription" href="userprescription">
              <FaPills /> Prescription Management
            </a>
          </li>
          <li className="active">
            <a href="/user">
              <FaUser /> User Management
            </a>
          </li>
          <li>
            <a className="customer" href="feedbacklist">
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
        <div className="user-list-container">
          <h2>User Management</h2><br></br>
          <Button className="mb-3" onClick={() => navigate("/admin")}>
            Back to Admin
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>
    </div>
  );
}

export default User;
