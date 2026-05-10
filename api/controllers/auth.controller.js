// ============================================================
// AUTH CONTROLLER — register, login, logout (JWT)
// ============================================================

const store = require("../data/store");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const SECRET = "inventory-secret-key";

module.exports = {
  register: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required." });

    const existing = store.findUserByUsername(username);
    if (existing)
      return res.status(409).json({ message: "Username already taken." });

    const user = { id: uuidv4(), username, password };
    store.addUser(user);

    res.status(201).json({ message: "Registered successfully." });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    const user = store.findUserByUsername(username);
    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid username or password." });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Logged in successfully.",
      token,
      user: { id: user.id, username: user.username },
    });
  },

  logout: (req, res) => {
    res.json({ message: "Logged out successfully." });
  },
};
