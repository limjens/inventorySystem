// ============================================================
// AUTH MIDDLEWARE — protects routes that require login
// ============================================================

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized. Please log in." });
  }
};
