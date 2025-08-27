import axios from "axios"; 
 
const BASE_URL = "http://localhost:8080/api/auth"; // Your backend URL 
 
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, JSON.stringify(userData), {
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data);
    throw error.response?.data?.message || "Error signing up!";
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.data); // Log success response
    return response.data; // Returns { message: "Login successful!" }
  } catch (error) {
    console.error(error);
    
    // Return a user-friendly error message
    throw error.response?.data?.message || "Invalid credentials";
  }
};
