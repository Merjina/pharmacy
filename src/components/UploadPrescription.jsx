// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/UploadPrescription.css";

// const UploadPrescription = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ name: "", email: "", phone: "" });
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   // ✅ Fetch user profile
//   useEffect(() => {
//     if (token) {
//       axios
//         .get("http://localhost:8080/api/auth/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setUser(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching user profile:", error);
//           setMessage("❌ Failed to load user profile.");
//         });
//     } else {
//       setMessage("❌ User not authenticated.");
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log("Selected file:", selectedFile); // ✅ Debug
//     setFile(selectedFile);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     console.log("Upload button clicked"); // ✅ Debug

//     if (!file) {
//       alert("❌ Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("prescription", file);
//     formData.append("name", user.name);
//     formData.append("email", user.email);
//     formData.append("phone", user.phone);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/prescriptions/upload", // ✅ corrected
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
      
//       console.log("Upload success:", response.data); // ✅ Debug
//       alert("✅ " + response.data);
//       setMessage("✅ Prescription uploaded successfully.");
//       setFile(null); // Reset file input after success
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("❌ Upload failed: " + (error.response?.data || error.message));
//     }
//   };

//   return (
//     <div className="prescription-upload-container">
//       <h2>Upload Prescription</h2>

//       <div className="profile-details">
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Phone:</strong> {user.phone}</p>
//       </div>

//       <form onSubmit={handleUpload} className="prescription-form">
//         <div>
//           <label>Upload Image:</label>
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>

//         <button type="submit">Upload</button>
//         {message && <p className="upload-msg">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default UploadPrescription;
