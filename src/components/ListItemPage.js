import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import "./ListItemPage.css";

const ListItemPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/products", formData);
      setSuccess(true);
      setError("");
      setFormData({ name: "", description: "", price: "" });
    } catch (err) {
      setSuccess(false);
      setError("Failed to list the item. Please try again.");
    }
  };

  return (
    <div className="list-item-page-container">
      <h1 className="list-item-header">List a New Item</h1>
      <div className="list-item-card">
        {success && <p className="success-message">Item listed successfully!</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter item name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Enter item description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter item price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="list-item-button">
            List Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListItemPage;
