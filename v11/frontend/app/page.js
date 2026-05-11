"use client";

// Home stranica
// Client Component jer koristi useAuth context.
// Pokazuje različit sadržaj za ulogovanog/neulogovanog korisnika.

import Link from "next/link";
import { useAuth } from "../utils/AuthContext.jsx";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div>
      <h1>Dobrodošli u v11</h1>

      <p className="opis">
        Ovo je prvi primjer gdje frontend (Next.js) i backend (FastAPI) rade
        <strong> zajedno</strong>. Login, registracija, autorizacija i fetchovanje
        podataka u tabele.
      </p>

      {user ? (
        <div className="card">
          <h2>Ulogovan si kao {user.username}</h2>
          <p>Email: {user.email}</p>
          {user.full_name && <p>Ime: {user.full_name}</p>}
          {user.is_admin && (
            <p style={{ color: "#dc3545", fontWeight: 600 }}>
              ⚡ Imaš admin privilegije
            </p>
          )}

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <Link href="/studenti">
              <button>Studenti</button>
            </Link>
            <Link href="/kursevi">
              <button>Kursevi</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <h2>Nisi ulogovan</h2>
          <p>Da bi vidio podatke (studente, kurseve), prvo se prijavi.</p>
          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <Link href="/login">
              <button>Prijava</button>
            </Link>
            <Link href="/register">
              <button className="secondary">Registracija</button>
            </Link>
          </div>
        </div>
      )}

      <h2 style={{ marginTop: 32 }}>Šta učimo u ovoj vježbi</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>TanStack Query</strong> (useQuery, useMutation) — moderni način za fetch</li>
        <li><strong>React Context</strong> — dijeljenje auth stanja kroz aplikaciju</li>
        <li><strong>JWT auth flow</strong> — login → token → localStorage → Authorization header</li>
        <li><strong>Form-data</strong> za login (FastAPI OAuth2 zahtjev)</li>
        <li><strong>Protected pages</strong> — redirect na /login ako nema tokena</li>
      </ul>
    </div>
  );
}
