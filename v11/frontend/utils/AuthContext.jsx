"use client";

// AuthContext.jsx
// React Context za auth - dijeli token i user info između komponenti.
//
// Kako radi:
//   1. AuthProvider drži state: token i user
//   2. Sve komponente unutar njega mogu pozvati useAuth()
//   3. Kad se neko logira, sve komponente koje koriste useAuth se re-renderuju
//
// Token se čuva u localStorage da preživi reload stranice.

import { createContext, useContext, useState, useEffect } from "react";
import { apiGet } from "./api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pri prvom mount-u, učitaj token iz localStorage
  // (localStorage je dostupan samo u browseru, ne na serveru)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
      // Dohvati user-a sa /auth/me da vidimo da li je token validan
      apiGet("/auth/me")
        .then((data) => setUser(data))
        .catch(() => {
          // Token nije validan - obriši ga
          localStorage.removeItem("token");
          setTokenState(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
    // Nakon login-a dohvati user-a
    apiGet("/auth/me")
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }

  function logout() {
    localStorage.removeItem("token");
    setTokenState(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook - jednostavniji nego useContext(AuthContext) svaki put
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth mora biti unutar AuthProvider-a");
  return ctx;
}
