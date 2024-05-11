const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.post("/", protect, createCategory);
router.put("/:id", protect, updateCategory);
router.get("/", protect, getCategories);
router.get("/:id", protect, getCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
