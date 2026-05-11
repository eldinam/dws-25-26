// lib/api.js
// Centralizovani fetch wrapperi koji automatski dodaju Bearer token.
// Ovdje je BASE URL backenda - mijenja se na jednom mjestu.

export const API_URL = "http://localhost:8000";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// Univerzalni GET sa Bearer tokenom
export async function apiGet(path) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `Greška: ${res.status}`);
  }

  return res.json();
}

// POST sa JSON body-jem
export async function apiPost(path, body) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `Greška: ${res.status}`);
  }

  return res.json();
}

// LOGIN je poseban - FastAPI OAuth2 koristi form-data, NE JSON
// Format: application/x-www-form-urlencoded
export async function apiLogin(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Pogrešni podaci za prijavu");
  }

  return res.json(); // { access_token, token_type }
}
