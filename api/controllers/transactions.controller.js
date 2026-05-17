// ============================================================
// TRANSACTIONS CONTROLLER
// ============================================================

const pool = require("../data/store");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getAll: async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM transactions ORDER BY date DESC",
      );
      const transactions = rows.map((t) => ({
        ...t,
        items: JSON.parse(t.items),
      }));
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: "Failed to get transactions." });
    }
  },

  add: async (req, res) => {
    try {
      const { items, total } = req.body;
      if (!items || total === undefined)
        return res
          .status(400)
          .json({ message: "Items and total are required." });

      const id = uuidv4();
      const date = new Date().toISOString().slice(0, 19).replace("T", " ");
      await pool.query(
        "INSERT INTO transactions (id, items, total, date) VALUES (?, ?, ?, ?)",
        [id, JSON.stringify(items), total, date],
      );
      res.status(201).json({ message: "Transaction saved.", id });
    } catch (err) {
      res.status(500).json({ message: "Failed to save transaction." });
    }
  },
};
