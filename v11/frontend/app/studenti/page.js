"use client";

// Studenti stranica - protected
// Pokazuje:
//   - useQuery za GET /students sa Bearer tokenom
//   - automatsko keširanje (drugi posjet stranice = instant)
//   - loading / error / success stanja
//   - tabela sa podacima

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../lib/api.js";
import { useAuth } from "../../lib/AuthContext.jsx";

export default function StudentiPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Protected route - ako nije ulogovan, redirektaj na login
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // useQuery automatski:
  //   - dohvata podatke kad se komponenta mountuje
  //   - kešira ih (queryKey je identifikator)
  //   - re-fetch kad se token promijeni (mi koristimo enabled)
  //   - vraća isLoading, error, data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: () => apiGet("/students"),
    enabled: !!user, // ne pokreći fetch dok user nije učitan
  });

  if (authLoading || !user) return <p>Provjera prijave...</p>;

  return (
    <div>
      <h1>Studenti</h1>

      <p className="opis">
        Tabela dohvaćena sa <code>GET /students</code> uz Bearer token.
        Koristimo <code>useQuery</code> iz TanStack Query - ne moramo ručno pisati
        useState + useEffect kao u v9.
      </p>

      {isLoading && <p>Učitavanje...</p>}

      {error && (
        <div className="error">
          Greška: {error.message}
          <br />
          <button onClick={() => refetch()} style={{ marginTop: 8 }}>
            Pokušaj ponovo
          </button>
        </div>
      )}

      {data && data.length === 0 && (
        <p>Nema studenata u bazi.{user.is_admin && " Admin može dodati nove."}</p>
      )}

      {data && data.length > 0 && (
        <>
          <p style={{ marginBottom: 12, color: "#6c757d", fontSize: "0.9rem" }}>
            Ukupno: {data.length} {data.length === 1 ? "student" : "studenata"}
          </p>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ime</th>
                <th>Godine</th>
                <th>Nadimak</th>
                <th>Broj kurseva</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.nickname || "—"}</td>
                  <td>{student.courses?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
