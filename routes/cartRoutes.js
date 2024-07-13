const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cartController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/add", authenticate, addToCart);
router.delete("/remove/:cartId", authenticate, removeFromCart);

module.exports = router;
