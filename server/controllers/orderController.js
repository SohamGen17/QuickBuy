const pool = require("../config/db");

const createOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const {
      customer,
      items,
      total_amount,
      payment_method,
    } = req.body;

    if (
      !customer ||
      !items ||
      items.length === 0 ||
      !total_amount
    ) {
      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    await connection.beginTransaction();

    const userId = req.user.userId;

    const [orderResult] = await connection.query(
      `
      INSERT INTO orders
        (user_id, total_amount, status)
      VALUES
        (?, ?, ?)
      `,
      [userId, total_amount, "confirmed"]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      const [stockResult] = await connection.query(
        `
        SELECT stock
        FROM products
        WHERE id = ?
        FOR UPDATE
        `,
        [item.product_id]
      );

      if (
        stockResult.length === 0 ||
        stockResult[0].stock < item.quantity
      ) {
        throw new Error(
          `Insufficient stock for product ${item.product_id}`
        );
      }

      await connection.query(
        `
        INSERT INTO order_items
          (order_id, product_id, quantity, price)
        VALUES
          (?, ?, ?, ?)
        `,
        [
          orderId,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );

      await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
        `,
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order created successfully",
      orderId,
      paymentMethod: payment_method,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Create order error:", error);

    res.status(500).json({
      message: error.message || "Failed to create order",
    });
  } finally {
    connection.release();
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [orders] = await pool.query(
      `
      SELECT
        o.id,
        o.total_amount,
        o.status,
        o.created_at
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
      `,
      [userId]
    );

    for (const order of orders) {
      const [items] = await pool.query(
        `
        SELECT
          oi.product_id,
          oi.quantity,
          oi.price,
          p.name,
          p.image_url
        FROM order_items oi
        JOIN products p
          ON oi.product_id = p.id
        WHERE oi.order_id = ?
        `,
        [order.id]
      );

      order.items = items;
    }

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};