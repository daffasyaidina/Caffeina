import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css"; // Import Navbar.css for styling

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleListItemClick = () => {
    navigate("/list"); // Redirect to the list item page
  };

  const handleLogout = () => {
    logout(); // Perform logout
    navigate("/"); // Force redirect to the home page
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Caffeina</Link>
      </h1>
      <div className="navbar-buttons">
        {token ? (
          <>
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
