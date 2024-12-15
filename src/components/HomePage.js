import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./HomePage.css";

// HomePage component
const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the server
  useEffect(() => {
    fetch("http://localhost:5000/api/products") // Fetch products from the server
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Render the component
  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">About Us</h1>
          <div className="about-section">
            <p className="about-description">
              Caffeina is a website specializing in Indonesian coffee beans, offering a curated
              selection from regions like Sumatra, Java, and Sulawesi. With detailed descriptions of
              each coffee's flavor and origin, Caffeina provides a seamless and inviting shopping
              experience for coffee enthusiasts, celebrating the rich heritage of Indonesian coffee.
            </p>
          </div>
        </div>
      </header>
      <section className="products-section">
        <h2 className="products-title">Products</h2>
        <div className="products-container">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/product/${product._id}`} // route to product details 
                key={product._id}
                className="product-link"
              >
                <div className="product-card">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">IDR {product.price.toLocaleString()} for 250g</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-products">No products available...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
