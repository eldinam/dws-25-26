"use client";

// Kursevi stranica - protected
// Skoro identično kao /studenti, samo druga tabela.
// Pokazuje da se isti pattern (useQuery + tabela) lako ponavlja.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../utils/api.js";
import { useAuth } from "../../utils/AuthContext.jsx";

export default function KurseviPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: () => apiGet("/courses"),
    enabled: !!user,
  });

  if (authLoading || !user) return <p>Provjera prijave...</p>;

  return (
    <div>
      <h1>Kursevi</h1>

      <p className="opis">
        Tabela kurseva. Primjeti kako se ista logika iz <code>/studenti</code>{" "}
        ponavlja samo sa drugim queryKey i URL-om. To je moć useQuery hooka.
      </p>

      {isLoading && <p>Učitavanje...</p>}

      {error && <div className="error">Greška: {error.message}</div>}

      {data && data.length === 0 && <p>Nema kurseva u bazi.</p>}

      {data && data.length > 0 && (
        <>
          <p style={{ marginBottom: 12, color: "#6c757d", fontSize: "0.9rem" }}>
            Ukupno: {data.length} {data.length === 1 ? "kurs" : "kurseva"}
          </p>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Opis</th>
                <th>Student</th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.description || "—"}</td>
                  <td>
                    {course.student
                      ? `${course.student.name} (${course.student.id})`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
