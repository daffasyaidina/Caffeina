import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  // Fetch product details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
        });
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        alert('Failed to fetch product details');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit edited data
  const handleEdit = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    axios
      .put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          Authorization: token, // Pass token for authentication
        },
      })
      .then(() => {
        setEditMode(false);
        setProduct(formData);
        alert('Product updated successfully!');
      })
      .catch((err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product');
      });
  };

  // Delete the product
  const handleDelete = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    axios
      .delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: token, // Pass the token in the request header
        },
      })
      .then(() => {
        alert('Product deleted successfully');
        navigate('/'); // Redirect to homepage
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      });
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
          <button className="save-btn" onClick={handleEdit}>
            Save
          </button>
          <button className="cancel-btn" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: IDR {product.price}</p>
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
