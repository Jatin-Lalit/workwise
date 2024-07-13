const { Cart, Product } = require("../models");

const addToCart = async (req, res) => {
  if (req.user.role !== "buyer") {
    return res.status(403).json({ error: "Access denied" });
  }
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const cartItem = await Cart.create({
      buyerId: req.user.userId,
      productId,
      quantity,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Add to cart failed" });
  }
};

const removeFromCart = async (req, res) => {
  if (req.user.role !== "buyer") {
    return res.status(403).json({ error: "Access denied" });
  }
  const { cartId } = req.params;
  try {
    const deleted = await Cart.destroy({
      where: { id: cartId, buyerId: req.user.userId },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Remove from cart failed" });
  }
};

module.exports = { addToCart, removeFromCart };
