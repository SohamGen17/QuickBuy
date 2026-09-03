const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/adminController");

const authenticateToken = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  authenticateToken,
  requireAdmin,
  getDashboardStats
);

module.exports = router;