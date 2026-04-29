import { useState, useEffect } from "react";

// PRIMJER 6: Fetch sa API-ja + useEffect + loading/error
// Ovo je najvažniji primjer dana - kako dovući podatke sa servera.
//
// Uvijek imamo 3 moguća stanja:
//   1. loading  - čekamo odgovor
//   2. error    - nešto je puklo
//   3. success  - imamo podatke
//
// Koristimo JSONPlaceholder - besplatni public API bez autentikacije.

function Korisnici() {
  const [korisnici, setKorisnici] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch vraća Promise
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Greška pri dohvaćanju podataka");
        return res.json();
      })
      .then((data) => {
        setKorisnici(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // prazan dep array = fetch se pokrene samo jednom, na mountu

  if (loading) {
    return <p>Učitavanje korisnika...</p>;
  }

  if (error) {
    return <p style={{ color: "#dc3545" }}>❌ Greška: {error}</p>;
  }

  return (
    <div>
      <p className="opis">
        Podaci su dohvaćeni sa javnog API-ja:
        <br />
        <code>https://jsonplaceholder.typicode.com/users</code>
      </p>
      <div className="grid">
        {korisnici.map((k) => (
          <div key={k.id} className="card">
            <h3 style={{ margin: "0 0 4px 0" }}>{k.name}</h3>
            <p style={{ margin: "4px 0", color: "#6c757d", fontSize: "0.9rem" }}>
              @{k.username}
            </p>
            <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
              📧 {k.email}
            </p>
            <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
              🏙️ {k.address?.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Korisnici;
