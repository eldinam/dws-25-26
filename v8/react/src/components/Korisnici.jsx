import { useEffect, useState } from "react";

function Korisnici() {
  const [korisnici, setKorisnici] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Greška pri dohvaćanju korisnika!");
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
  }, []);

  if (loading) return <p>Učitavanje korisnika... </p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <ul>
      {korisnici.map((korisnik) => (
        <li key={korisnik.id}>
          {korisnik.name} - {korisnik.email}
        </li>
      ))}
    </ul>
  );
}

export default Korisnici;
