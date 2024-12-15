import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import "./SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous errors
    try {
      const response = await axios.post("/users/signup", formData);
      if (response.status === 201) {
        alert("Signup successful!");
        window.location.href = "/login"; // Redirect to the login page
      }
    } catch (error) {
      console.error("Signup error:", error.response || error);
      setErrorMessage(
        error.response?.data?.message || "Error during sign up. Please try again."
      );
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign up to Caffeina</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Sign up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  );
};

export default SignupPage;
