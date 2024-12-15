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
    <div className="list-item-page">
      <h1>List a New Item</h1>
      {success && <p className="success">Item listed successfully!</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">List Item</button>
      </form>
    </div>
  );
};

export default ListItemPage;
