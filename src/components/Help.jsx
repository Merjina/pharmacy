import React, { useState, useEffect } from "react";

const Help = () => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/help/user"); // Make sure this is correct API endpoint
      const data = await res.json();

      console.log("Fetched messages:", data);  // Log the data

      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setMessages([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
      setMessages([]); // Fallback to empty array on error
    }
  };

  const handleSendMessage = async () => {
    if (!content) {
      alert("Please type a message.");
      return;
    }

    try {
      await fetch("http://localhost:8080/api/help/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      setContent("");
      await fetchMessages(); // Refresh after sending
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Help and Support</h2>

      <div style={{ marginBottom: "20px" }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <br />

        <button
          onClick={handleSendMessage}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send Message
        </button>
      </div>

      <h3>Your Previous Messages:</h3>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {msg.content && <p><strong>You:</strong> {msg.content}</p>}
            {msg.reply && (
              <p style={{ color: "green" }}>
                <strong>Staff Reply:</strong> {msg.reply}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Help;
