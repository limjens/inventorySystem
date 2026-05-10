// ============================================================
// AUTH MIDDLEWARE — verifies JWT token
// ============================================================

const jwt = require("jsonwebtoken");

const SECRET = "inventory-secret-key";

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized. Please log in." });

  jwt.verify(token, SECRET, (err, user) => {
    if (err)
      return res.status(401).json({ message: "Invalid or expired token." });
    req.user = user;
    next();
  });
};
