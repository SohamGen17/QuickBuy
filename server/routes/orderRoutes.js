const express = require("express");

const {
  createOrder,
  getMyOrders,
} = require("../controllers/orderController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// User must be logged in to place an order
router.post(
  "/",
  authenticateToken,
  createOrder
);

// User must be logged in to view their orders
router.get(
  "/my-orders",
  authenticateToken,
  getMyOrders
);

module.exports = router;