let users = JSON.parse(localStorage.getItem("users")) || [
  { username: "admin", password: "1234" },
];

// REGISTER
function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const exists = users.find((u) => u.username === username);

  if (exists) {
    alert("User already exists");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully!");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

// AUTH CHECK (for protected pages later)
function checkAuth() {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    window.location.href = "login.html";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
