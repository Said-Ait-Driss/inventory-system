const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createCommand,
  getCommands,
  getCommand,
  deleteCommand,
  updateCommand,
} = require("../controllers/commandController");

router.post("/", protect, createCommand);
router.put("/:id", protect, updateCommand);
router.get("/", protect, getCommands);
router.get("/:id", protect, getCommand);
router.delete("/:id", protect, deleteCommand);

module.exports = router;
