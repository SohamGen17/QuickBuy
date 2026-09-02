const pool = require("../config/db");

const getProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        p.stock,
        p.rating,
        c.name AS category
      FROM products p
      LEFT JOIN categories c
        ON p.category_id = c.id
      ORDER BY p.id DESC
    `);

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await pool.query(
      `
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        p.stock,
        p.rating,
        c.name AS category
      FROM products p
      LEFT JOIN categories c
        ON p.category_id = c.id
      WHERE p.id = ?
      `,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(products[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
};