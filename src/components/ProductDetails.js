import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3>Price: ${product.price}</h3>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;