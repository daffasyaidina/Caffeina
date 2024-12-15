import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">About Us</h1>
        <p className="subtitle">
          Caffeina is a website specializing in Indonesian coffee beans, offering a curated
          selection from regions like Sumatra, Java, and Sulawesi. With detailed descriptions of
          each coffee's flavor and origin, Caffeina provides a seamless and inviting shopping
          experience for coffee enthusiasts, celebrating the rich heritage of Indonesian coffee.
        </p>
      </header>
      <section className="products-section">
        <h2 className="products-title">Products</h2>
        <div className="products-container">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/product/${product._id}`} // Dynamic route to product details page
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
