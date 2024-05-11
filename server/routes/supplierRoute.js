const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/supplierController");

router.post("/", protect, createSupplier);
router.patch("/:id", protect, updateSupplier);
router.get("/", protect, getSuppliers);
router.get("/:id", protect, getSupplier);
router.delete("/:id", protect, deleteSupplier);

module.exports = router;
