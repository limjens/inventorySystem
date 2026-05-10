// ============================================================
// AUTH CONTROLLER — register, login, logout
// ============================================================

const store = require("../data/store");
const { v4: uuidv4 } = require("uuid");

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

    req.session.user = { id: user.id, username: user.username };
    res.json({ message: "Logged in successfully.", user: req.session.user });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out successfully." });
  },
};
