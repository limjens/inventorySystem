// ============================================================
// AUTH CONTROLLER — register, login, logout (JWT + MySQL)
// ============================================================

const pool = require("../data/store");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const SECRET = "inventory-secret-key";

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required." });

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );

    if (existing.length > 0)
      return res.status(409).json({ message: "Username already taken." });

    const id = uuidv4();
    await pool.query(
      "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
      [id, username, password],
    );

    res.status(201).json({ message: "Registered successfully." });
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
    );

    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid username or password." });

    const user = rows[0];
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Logged in successfully.",
      token,
      user: { id: user.id, username: user.username },
    });
  },

  logout: async (req, res) => {
    res.json({ message: "Logged out successfully." });
  },
};
