import { useState } from "react";

// PRIMJER 3: Controlled input
// "Controlled" znači da React kontroliše vrijednost inputa (preko state-a),
// a ne DOM. Svaki put kad korisnik otkuca slovo:
//   1. onChange se pokrene
//   2. setIme ažurira state
//   3. komponenta se re-renderuje sa novom vrijednošću
//   4. input pokazuje novu vrijednost

function UnosImena() {
  const [ime, setIme] = useState("");

  return (
    <div>
      <input
        type="text"
        value={ime}
        onChange={(e) => setIme(e.target.value)}
        placeholder="Unesi svoje ime..."
        style={{ width: "100%", marginBottom: "12px" }}
      />

      <p style={{ fontSize: "1.2rem" }}>
        Zdravo, <strong>{ime || "nepoznati"}</strong>!
      </p>

      <p style={{ fontSize: "0.85rem", color: "#6c757d" }}>
        Broj unesenih znakova: {ime.length}
      </p>
    </div>
  );
}

export default UnosImena;
