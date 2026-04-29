import { useState } from "react";

// Nastavak iz v8 - BookCard sada ima vlastiti state za broj lajkova.
// Svaka kartica ima svoj nezavisni state - lajkovanje jedne ne utiče na druge.
// Ovo pokazuje zašto je state lokalan za komponentu.

function BookCard({ naslov, autor, godina, cijena }) {
  const [lajkovi, setLajkovi] = useState(0);

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 4px 0" }}>{naslov}</h3>
      <p style={{ margin: "4px 0", color: "#6c757d" }}>
        {autor} · {godina}.
      </p>
      <p style={{ margin: "8px 0", fontWeight: 600 }}>
        {cijena} KM
      </p>
      <button
        onClick={() => setLajkovi(lajkovi + 1)}
        style={{ background: "#ff6b6b", color: "white" }}
      >
        ♥ {lajkovi}
      </button>
    </div>
  );
}

export default BookCard;
