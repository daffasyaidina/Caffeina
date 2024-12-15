import React, { createContext, useState } from "react";
import axios from "../utils/axiosConfig";

// Create a context
export const AuthContext = createContext();

// Create a provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
    // Define the login function
  const login = async (email, password) => {
    const response = await axios.post("/users/login", { email, password });//
    const newToken = response.data.token;
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
