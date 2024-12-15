const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a Product
router.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const product = await Product.create({ name, description, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// delete a product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
