import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UploadPrescription.css";

const UploadPrescription = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setMessage("❌ Failed to load user profile.");
      });
  }, [token]);

  // Fetch prescriptions
  const fetchPrescriptions = () => {
    axios
      .get("http://localhost:8080/api/prescriptions/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPrescriptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching prescriptions:", error);
      });
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [token]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("❌ Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/prescriptions/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ " + response.data);
      setMessage("Prescription uploaded successfully.");
      fetchPrescriptions(); // refresh data after upload
    } catch (error) {
      console.error("❌ Error uploading prescription:", error.response?.data || error.message);
      alert("❌ Upload failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="prescription-upload-container">
      <h2>Upload Prescription</h2>

      <div className="profile-details">
        <p><strong>Name:</strong> {user.name || "Loading..."}</p>
        <p><strong>Email:</strong> {user.email || "Loading..."}</p>
        <p><strong>Phone:</strong> {user.phone || "Loading..."}</p>
      </div>

      {/* Show only the latest prescription status */}
      {prescriptions.length > 0 && (() => {
        const latest = prescriptions[prescriptions.length - 1];
        return latest.approved ? (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#d4edda",
              color: "#155724",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            ✅ Your prescription has been approved by the staff.
            <br />
            <strong>File Name:</strong> {latest.filePath}
          </div>
        ) : (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff3cd",
              color: "#856404",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            ⏳ Prescription uploaded successfully and is waiting for staff approval.
          </div>
        );
      })()}

      <form onSubmit={handleUpload} className="prescription-form">
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit">Upload</button>
        {message && <p className="upload-msg">{message}</p>}
      </form>

      <div className="profile-buttons">
        <button className="back-button" onClick={() => navigate("/home")}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UploadPrescription;
