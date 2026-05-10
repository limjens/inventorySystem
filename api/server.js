// ============================================================
// SERVER — entry point
// ============================================================

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/products.routes");

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "inventory-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
