const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const authenticate = require("../middleware/auth");

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
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product.' });
  }
});

// Edit a product
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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
