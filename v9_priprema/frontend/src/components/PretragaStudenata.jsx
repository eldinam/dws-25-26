import { useState } from "react";

// PRIMJER 4: Controlled input + filter + conditional rendering
// Kombinacija koncepata:
//  - state (pretraga)
//  - filtriranje niza (derived state)
//  - map() za renderovanje liste
//  - key prop
//  - ternary za dva različita UI stanja (ima/nema rezultata)

const studenti = [
  { id: 1, ime: "Ana Delić", godine: 20 },
  { id: 2, ime: "Marko Petrović", godine: 22 },
  { id: 3, ime: "Ivana Horvat", godine: 19 },
  { id: 4, ime: "Petar Jović", godine: 23 },
  { id: 5, ime: "Lejla Hodžić", godine: 21 },
  { id: 6, ime: "Amar Begić", godine: 20 },
];

function PretragaStudenata() {
  const [pretraga, setPretraga] = useState("");

  // derived state - izračunava se iz pretrage pri svakom renderu
  const filtrirani = studenti.filter((s) =>
    s.ime.toLowerCase().includes(pretraga.toLowerCase())
  );

  return (
    <div>
      <input
        value={pretraga}
        onChange={(e) => setPretraga(e.target.value)}
        placeholder="Pretraži studente po imenu..."
        style={{ width: "100%", marginBottom: "16px" }}
      />

      <p style={{ fontSize: "0.85rem", color: "#6c757d" }}>
        Pronađeno: {filtrirani.length} / {studenti.length}
      </p>

      {filtrirani.length === 0 ? (
        <p style={{ color: "#dc3545" }}>
          Nema rezultata za "<strong>{pretraga}</strong>"
        </p>
      ) : (
        <ul style={{ paddingLeft: "20px" }}>
          {filtrirani.map((s) => (
            <li key={s.id}>
              <strong>{s.ime}</strong> — {s.godine} godina
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PretragaStudenata;
