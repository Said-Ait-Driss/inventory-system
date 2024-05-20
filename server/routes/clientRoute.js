const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
} = require("../controllers/clientController");

router.post("/", protect, createClient);
router.put("/:id", protect, updateClient);
router.get("/", protect, getClients);
router.get("/:id", protect, getClient);
router.delete("/:id", protect, deleteClient);

module.exports = router;
