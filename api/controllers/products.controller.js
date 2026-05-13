// ============================================================
// PRODUCTS CONTROLLER — CRUD + duplicate prevention (MySQL)
// ============================================================

const pool = require("../data/store");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getAll: async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  },

  add: async (req, res) => {
    const { name, price, stock } = req.body;

    if (!name || price === undefined || stock === undefined)
      return res
        .status(400)
        .json({ message: "Name, price and stock are required." });

    const [existing] = await pool.query(
      "SELECT * FROM products WHERE LOWER(name) = LOWER(?)",
      [name],
    );

    if (existing.length > 0)
      return res.status(409).json({ message: "Product already exists." });

    const id = uuidv4();
    await pool.query(
      "INSERT INTO products (id, name, price, stock) VALUES (?, ?, ?, ?)",
      [id, name, price, stock],
    );

    res
      .status(201)
      .json({ message: "Product added.", product: { id, name, price, stock } });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const [existing] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (existing.length === 0)
      return res.status(404).json({ message: "Product not found." });

    await pool.query(
      "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
      [name, price, stock, id],
    );

    res.json({ message: "Product updated." });
  },

  remove: async (req, res) => {
    const { id } = req.params;

    const [existing] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (existing.length === 0)
      return res.status(404).json({ message: "Product not found." });

    await pool.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted." });
  },
};
