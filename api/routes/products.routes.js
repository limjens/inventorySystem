// ============================================================
// PRODUCTS ROUTES — all protected by auth middleware
// ============================================================

const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", productsController.getAll);
router.post("/", productsController.add);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

module.exports = router;
