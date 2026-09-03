const express = require("express");

const {
  createBooking,
  getMyBookings,
} = require("../controllers/bookingController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// User must be logged in to create a booking
router.post(
  "/",
  authenticateToken,
  createBooking
);

// User must be logged in to view their bookings
router.get(
  "/my-bookings",
  authenticateToken,
  getMyBookings
);

module.exports = router;