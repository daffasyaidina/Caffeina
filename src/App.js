import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Navbar from "./components/Navbar";
import ListItemPage from "./components/ListItemPage";
import ProductDetails from "./components/ProductDetails"; 

// App component
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/list" element={<ListItemPage />} />
          <Route path="/product/:id" element={<ProductDetails />} /> {/* New Route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
