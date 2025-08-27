import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import axios from "axios";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        identifier,
        password,
      });

      const { token, role, userId } = response.data;

      // Save token & user info to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      // Navigate based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "STAFF") {
        navigate("/staff");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-header">LOGIN</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <div className="label-input">
              <label htmlFor="identifier">Email or Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="identifier"
                placeholder="Enter your email or phone"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <div className="label-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-success login-btn">
              Login
            </button>
          </div>

          <div className="additional-links text-center">
            <a href="/forgot" className="forgot-password-link">Forgot Password?</a>
            <p>
              Don't have an account? <a href="/signup">Register Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
