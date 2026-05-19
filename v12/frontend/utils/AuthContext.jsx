"use client";

// utils/AuthContext.jsx
// Context za auth state - isto kao u v11, samo koristi axios umjesto fetch.

import { createContext, useContext, useState, useEffect } from "react";
import api from "./api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
      api
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
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
    api.get("/auth/me").then((res) => setUser(res.data));
  }

  function logout() {
    localStorage.removeItem("token");
    setTokenState(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, logout, isAdmin: !!user?.is_admin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth mora biti unutar AuthProvider-a");
  return ctx;
}
