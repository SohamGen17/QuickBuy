const pool = require("../config/db");

// Convert "10:00 AM" -> "10:00:00"
// Convert "02:00 PM" -> "14:00:00"
const convertTimeToMySQL = (time) => {
  if (!time) {
    return null;
  }

  const [timePart, modifier] = time.split(" ");

  let [hours, minutes] = timePart.split(":");

  hours = Number(hours);
  minutes = Number(minutes);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:00`;
};

const createBooking = async (req, res) => {
  try {
    const {
      booking_date,
      booking_time,
    } = req.body;

    if (!booking_date || !booking_time) {
      return res.status(400).json({
        message: "Booking date and time are required",
      });
    }

    const mysqlTime = convertTimeToMySQL(booking_time);

    if (!mysqlTime) {
      return res.status(400).json({
        message: "Invalid booking time",
      });
    }

    const userId = req.user.userId;
    const [result] = await pool.query(
      `
      INSERT INTO bookings
        (user_id, booking_date, booking_time, status)
      VALUES
        (?, ?, ?, ?)
      `,
      [
        userId,
        booking_date,
        mysqlTime,
        "confirmed",
      ]
    );

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: result.insertId,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message:
        error.sqlMessage ||
        error.message ||
        "Failed to create booking",
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [bookings] = await pool.query(
      `
      SELECT
        id,
        booking_date,
        booking_time,
        status,
        created_at
      FROM bookings
      WHERE user_id = ?
      ORDER BY booking_date DESC, booking_time DESC
      `,
      [userId]
    );

    res.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message:
        error.sqlMessage ||
        error.message ||
        "Failed to fetch bookings",
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};