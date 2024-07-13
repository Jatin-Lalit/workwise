const express = require("express");
const {
  addProduct,
  editProduct,
  deleteProduct,
  searchProducts,
  getAllProducts,
} = require("../controllers/productController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/add", authenticate, addProduct);
router.put("/edit/:productId", authenticate, editProduct);
router.delete("/delete/:productId", authenticate, deleteProduct);
router.get("/search", searchProducts);
router.get("/all", getAllProducts);

module.exports = router;
