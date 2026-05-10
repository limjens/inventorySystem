// ============================================================
// AUTH — connects to API
// ============================================================

const API = "http://localhost:3000/api";

async function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Registered successfully!");
  window.location.href = "login.html";
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  sessionStorage.setItem("user", JSON.stringify(data.user));
  window.location.href = "dashboard.html";
}

async function checkAuth() {
  const user = sessionStorage.getItem("user");
  if (!user) {
    window.location.href = "login.html";
    return;
  }
}

async function logout() {
  await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  sessionStorage.removeItem("user");
  window.location.href = "login.html";
}
