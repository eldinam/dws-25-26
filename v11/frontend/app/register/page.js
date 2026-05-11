"use client";

// Register stranica
// Slično kao Login - useMutation za POST.
// Razlika: backend očekuje JSON (ne form-data kao login).

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { apiPost } from "../../utils/api.js";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () =>
      apiPost("/auth/register", {
        username,
        email,
        full_name: fullName || null,
        password,
      }),
    onSuccess: () => {
      setSuccess(true);
      // Nakon 1.5 sekunde redirektaj na login
      setTimeout(() => router.push("/login"), 1500);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <div className="card">
        <h1>Registracija</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Korisničko ime *</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Puno ime</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="(opcionalno)"
            />
          </div>

          <div className="field">
            <label>Lozinka *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
            />
          </div>

          {mutation.isError && (
            <div className="error">{mutation.error.message}</div>
          )}

          {success && (
            <div className="success">
              Uspješno registrovan! Preusmjeravanje na prijavu...
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.isPending || success}
            style={{ width: "100%" }}
          >
            {mutation.isPending ? "Registracija..." : "Registruj se"}
          </button>
        </form>

        <p style={{ marginTop: 16, fontSize: "0.9rem", color: "#6c757d" }}>
          Već imaš nalog? <Link href="/login" style={{ color: "#61dafb" }}>Prijavi se</Link>
        </p>
      </div>
    </div>
  );
}
