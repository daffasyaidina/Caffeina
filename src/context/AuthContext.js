import React, { createContext, useState } from "react";
import axios from "../utils/axiosConfig";

// Create a context
export const AuthContext = createContext();

// Create a provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  // Define the login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("/users/login", { email, password });
      const newToken = response.data.token;
      const userName = response.data.username || "Guest"; // Ensure fallback if undefined

      localStorage.setItem("token", newToken);
      localStorage.setItem("username", userName); // Store username
      setToken(newToken);
      setUsername(userName);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
