const { Product } = require("../models");

const addProduct = async (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ error: "Access denied" });
  }
  const { name, category, description, price, discount } = req.body;
  try {
    const product = await Product.create({
      sellerId: req.user.userId,
      name,
      category,
      description,
      price,
      discount,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Product creation failed" });
  }
};

const editProduct = async (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ error: "Access denied" });
  }
  const { productId } = req.params;
  const { name, category, description, price, discount } = req.body;
  try {
    const [updated] = await Product.update(
      { name, category, description, price, discount },
      { where: { id: productId, sellerId: req.user.userId } }
    );
    if (updated) {
      const updatedProduct = await Product.findOne({
        where: { id: productId },
      });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Product update failed" });
  }
};

const deleteProduct = async (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ error: "Access denied" });
  }
  const { productId } = req.params;
  try {
    const deleted = await Product.destroy({
      where: { id: productId, sellerId: req.user.userId },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Product deletion failed" });
  }
};

const searchProducts = async (req, res) => {
  const { name, category } = req.query;
  const where = {};
  if (name) where.name = name;
  if (category) where.category = category;
  try {
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  searchProducts,
  getAllProducts,
};
