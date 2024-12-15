import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  

  return (
    <div className="homepage">
      <section className="about">
        <h1>About Us</h1>
        <p>
          Caffeina is a website specializing in Indonesian coffee beans, offering
          a curated selection from regions like Sumatra, Java, and Sulawesi. With
          detailed descriptions of each coffee's flavor and origin, Caffeina
          provides a seamless and inviting shopping experience for coffee
          enthusiasts, celebrating the rich heritage of Indonesian coffee.
        </p>
      </section>

      <section className="products">
        <h2>Products</h2>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>${product.price}</strong>
                </p>
              </div>
            ))
          ) : (
            <p className="no-listing">No listing available...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
