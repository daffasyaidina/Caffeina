import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css"; 

const Navbar = () => {
  const { token, logout, username } = useContext(AuthContext); // Fetch username
  const navigate = useNavigate();

  const handleListItemClick = () => {
    navigate("/list"); // Redirect to the list item page
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Caffeina</Link>
      </h1>
      <div className="navbar-buttons">
        {token ? (
          <>
            <span className="navbar-username">{username ? `Hello, ${username}` : "Welcome, guest"}</span>
            <button className="list-item-btn" onClick={handleListItemClick}>
              List Item
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
