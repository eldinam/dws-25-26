"use client";

// Login stranica
// Koristi useMutation iz TanStack Query za asinhroni POST zahtjev.
//
// Mutation vs Query:
//   - useQuery   = dohvat podataka (GET, automatsko keširanje)
//   - useMutation = mijenjanje podataka (POST/PUT/DELETE, ručno pokretanje)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { apiLogin } from "../../utils/api.js";
import { useAuth } from "../../utils/AuthContext.jsx";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: () => apiLogin(username, password),
    onSuccess: (data) => {
      // data = { access_token, token_type }
      login(data.access_token);
      router.push("/");
    },
    // onError ne moramo ručno pisati - mutation.error je automatski
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(); // pokreni mutaciju
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <div className="card">
        <h1>Prijava</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Korisničko ime</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label>Lozinka</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {mutation.isError && (
            <div className="error">{mutation.error.message}</div>
          )}

          <button type="submit" disabled={mutation.isPending} style={{ width: "100%" }}>
            {mutation.isPending ? "Prijava u toku..." : "Prijavi se"}
          </button>
        </form>

        <p style={{ marginTop: 16, fontSize: "0.9rem", color: "#6c757d" }}>
          Nemaš nalog? <Link href="/register" style={{ color: "#61dafb" }}>Registruj se</Link>
        </p>
      </div>
    </div>
  );
}
