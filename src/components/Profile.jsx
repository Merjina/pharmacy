import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [token]);

  return (
    <div className="profile-background">
      <div className="profile-container">
        <h2>Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
  
        <div className="profile-buttons">
          <button
            className="edit-button"
            onClick={() => navigate("/profileupdate", { state: user })}
          >
            Edit Profile
          </button>
  
          <button className="back-button" onClick={() => navigate("/home")}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
  

};

export default Profile;
