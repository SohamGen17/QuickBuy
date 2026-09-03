const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [[productStats]] = await pool.query(
      "SELECT COUNT(*) AS totalProducts FROM products"
    );

    const [[orderStats]] = await pool.query(
      "SELECT COUNT(*) AS totalOrders FROM orders"
    );

    const [[userStats]] = await pool.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[bookingStats]] = await pool.query(
      "SELECT COUNT(*) AS totalBookings FROM bookings"
    );

    const [[revenueStats]] = await pool.query(
      `
      SELECT COALESCE(SUM(total_amount), 0) AS totalRevenue
      FROM orders
      WHERE status = 'confirmed'
      `
    );

    res.json({
      totalProducts: productStats.totalProducts,
      totalOrders: orderStats.totalOrders,
      totalUsers: userStats.totalUsers,
      totalBookings: bookingStats.totalBookings,
      totalRevenue: Number(revenueStats.totalRevenue),
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};