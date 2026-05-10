// ============================================================
// INVENTORY — connects to API using JWT
// ============================================================

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function fetchProducts() {
  const res = await fetch(`${API}/products`, { headers: getHeaders() });
  if (res.status === 401) {
    window.location.href = "login.html";
    return [];
  }
  return await res.json();
}

async function render() {
  const products = await fetchProducts();
  const table = document.getElementById("table");
  table.innerHTML = "";

  products.forEach((p) => {
    table.innerHTML += `
      <tr class="text-center border-t">
        <td class="px-5 py-3">${p.id}</td>
        <td class="px-5 py-3">${p.name}</td>
        <td class="px-5 py-3">$${p.price}</td>
        <td class="px-5 py-3">${p.stock}</td>
        <td class="px-5 py-3">
          <button onclick="addStock('${p.id}')"
            class="bg-green-500 text-white px-2 py-1 rounded">+Stock</button>
          <button onclick="deleteProduct('${p.id}')"
            class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </td>
      </tr>`;
  });
}

async function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);

  if (!name || isNaN(price) || isNaN(stock)) {
    alert("Fill all fields");
    return;
  }

  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, price, stock }),
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.message);
    return;
  }

  render();
}

async function addStock(id) {
  const qty = parseInt(prompt("Add stock:"));
  if (isNaN(qty)) return;

  const products = await fetchProducts();
  const p = products.find((x) => x.id === id);
  if (!p) return;

  const res = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      name: p.name,
      price: p.price,
      stock: p.stock + qty,
    }),
  });

  if (!res.ok) {
    alert("Failed to update stock");
    return;
  }
  render();
}

async function deleteProduct(id) {
  const res = await fetch(`${API}/products/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) {
    alert("Failed to delete product");
    return;
  }
  render();
}

// INIT
if (!checkAuth()) {
  // redirected
} else {
  render();
}
