import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ProfileUpdate.css"

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(location.state || { name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};
    
    if (!user.name.trim()) validationErrors.name = "Name is required";
    if (!user.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!user.phone.trim()) {
      validationErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(user.phone)) {
      validationErrors.phone = "Phone must be a 10-digit number";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    axios
      .put("http://localhost:8080/api/auth/profileupdate", user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Profile updated successfully!");
        navigate("/profile");
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="profile-update-container">
      <h2>Update Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={user.phone} onChange={handleChange} />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>
        <button className="update-btn" type="submit">Update Profile</button>
      </form>
    </div>
  );
}  

export default ProfileUpdate;
