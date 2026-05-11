"use client";

// Navbar
// Client Component jer koristi useAuth (Context) i usePathname.
//
// Prikazuje različite linkove u zavisnosti od toga je li korisnik ulogovan.

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../utils/AuthContext.jsx";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function navLink(href, label) {
    const aktivan = pathname === href;
    return (
      <Link
        href={href}
        style={{
          color: aktivan ? "#61dafb" : "white",
          fontWeight: aktivan ? 700 : 500,
        }}
      >
        {label}
      </Link>
    );
  }

  return (
    <nav className="nav">
      <Link href="/" className="logo">
        DWS · v11
      </Link>

      {navLink("/", "Početna")}

      {/* Linkovi koji se vide samo ulogovanom korisniku */}
      {user && navLink("/studenti", "Studenti")}
      {user && navLink("/kursevi", "Kursevi")}

      <span className="spacer" />

      {loading ? (
        <span className="user">...</span>
      ) : user ? (
        <>
          <span className="user">
            👤 {user.username} {user.is_admin && "(admin)"}
          </span>
          <button onClick={handleLogout} className="secondary">
            Odjava
          </button>
        </>
      ) : (
        <>
          {navLink("/login", "Prijava")}
          {navLink("/register", "Registracija")}
        </>
      )}
    </nav>
  );
}
