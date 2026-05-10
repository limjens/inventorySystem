let products = JSON.parse(localStorage.getItem("products")) || [];

function save() {
  localStorage.setItem("products", JSON.stringify(products));
}

function render() {
  const table = document.getElementById("table");
  table.innerHTML = "";

  products.forEach((p) => {
    table.innerHTML += ` <tr class="text-center border-t"> <td>${p.id}</td> <td>${p.name}</td> <td>${p.price}</td> <td>${p.stock}</td> <td> <button onclick="addStock(${p.id})"
         class="bg-green-500 text-white px-2 py-1 rounded">
+Stock </button>


      <button onclick="deleteProduct(${p.id})"
        class="bg-red-500 text-white px-2 py-1 rounded">
        Delete
      </button>
    </td>
  </tr>
`;
  });
}

function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);

  if (!name || isNaN(price) || isNaN(stock)) {
    alert("Fill all fields");
    return;
  }

  // 🔴 DUPLICATE CHECK (case-insensitive)
  const exists = products.find(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  );

  if (exists) {
    alert("Product already exists!");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    stock,
  };

  products.push(product);
  save();
  render();
}

function addStock(id) {
  const p = products.find((x) => x.id === id);
  const qty = parseInt(prompt("Add stock:"));

  if (!isNaN(qty)) {
    p.stock += qty;
    save();
    render();
  }
}

function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  save();
  render();
}

// INIT
render();
