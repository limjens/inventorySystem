// ============================================================
// PRODUCTS CONTROLLER — CRUD + duplicate prevention
// ============================================================

const store = require("../data/store");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getAll: (req, res) => {
    res.json(store.getProducts());
  },

  add: (req, res) => {
    const { name, price, stock } = req.body;

    if (!name || price === undefined || stock === undefined)
      return res
        .status(400)
        .json({ message: "Name, price and stock are required." });

    const duplicate = store.findProductByName(name);
    if (duplicate)
      return res.status(409).json({ message: "Product already exists." });

    const product = { id: uuidv4(), name, price, stock };
    store.addProduct(product);

    res.status(201).json({ message: "Product added.", product });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const existing = store.getProducts().find((p) => p.id === id);
    if (!existing)
      return res.status(404).json({ message: "Product not found." });

    store.updateProduct(id, { name, price, stock });
    res.json({ message: "Product updated." });
  },

  remove: (req, res) => {
    const { id } = req.params;

    const existing = store.getProducts().find((p) => p.id === id);
    if (!existing)
      return res.status(404).json({ message: "Product not found." });

    store.deleteProduct(id);
    res.json({ message: "Product deleted." });
  },
};
