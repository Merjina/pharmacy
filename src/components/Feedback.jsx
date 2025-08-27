import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/Feedback.css";

const FEEDBACK_API_URL = "http://localhost:8080/api/feedback";

const Feedback = () => {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${FEEDBACK_API_URL}/send`, { userName, message });

      if (response.status === 200) {
        setSuccessMessage("Feedback sent successfully!");
        setUserName("");
        setMessage("");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      setErrorMessage("Failed to send feedback. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
  <Navbar />
  <div className="opinion-background">
    <div className="feedback-container">
      <h2>Opinion Board</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Opinion"
          required
        ></textarea>
        <button type="submit">Submit Opinion</button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Feedback;
