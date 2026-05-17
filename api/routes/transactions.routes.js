const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactions.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", transactionsController.getAll);
router.post("/", transactionsController.add);

module.exports = router;
