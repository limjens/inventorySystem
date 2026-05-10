// ============================================================
// STORE — in-memory data source
// Phase 1: arrays | Phase 2: swap this file for DB queries
// ============================================================

let users = [];
let products = [];

module.exports = {
  // Users
  getUsers: () => users,
  addUser: (user) => users.push(user),
  findUserByUsername: (username) =>
    users.find((u) => u.username.toLowerCase() === username.toLowerCase()),

  // Products
  getProducts: () => products,
  addProduct: (product) => products.push(product),
  updateProduct: (id, updated) => {
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) products[index] = { ...products[index], ...updated };
  },
  deleteProduct: (id) => {
    products = products.filter((p) => p.id !== id);
  },
  findProductByName: (name) =>
    products.find((p) => p.name.toLowerCase() === name.toLowerCase()),
};
