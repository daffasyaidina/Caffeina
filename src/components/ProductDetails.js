import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch product details
  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = token ? { Authorization: token } : {};

    axios
      .get(`http://localhost:5000/api/products/${id}`, { headers })
      .then((response) => {
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
        });
        if (token) {
          const user = JSON.parse(atob(token.split(".")[1]));
          setCurrentUser(user.id);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        alert("Failed to fetch product details");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    const token = localStorage.getItem("token");
    if (currentUser !== product.user) {
      alert("You are not authorized to edit this product.");
      return;
    }

    axios
      .put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { Authorization: token },
      })
      .then(() => {
        setEditMode(false);
        setProduct(formData);
        alert("Product updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        alert("Failed to update product");
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (currentUser !== product.user) {
      alert("You are not authorized to delete this product.");
      return;
    }

    // Confirmation before deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: token },
        })
        .then(() => {
          alert("Product deleted successfully");
          navigate("/"); // Redirect to homepage after deletion
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to delete product");
        });
    }
  };

  return (
    <div className="product-details-container">
      <h1>Product Details</h1>
      {editMode ? (
        <div className="edit-mode">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <div className="product-buttons">
            <button className="save-btn" onClick={handleEdit}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">Price: IDR {product.price}</p>
          {currentUser === product.user && (
            <div className="product-buttons">
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
