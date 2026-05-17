// ============================================================
// AUTH ROUTES
// ============================================================

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected user management routes
router.use(authMiddleware);
router.get("/users", authController.getAll);
router.put("/users/:username", authController.update);
router.delete("/users/:username", authController.delete);

module.exports = router;
