import { useState } from "react";
import BookCard from "./BookCard.jsx";

// Nastavak Knjižare iz v8 - sada sa:
//  - state (lista knjiga, pretraga)
//  - controlled input za pretragu
//  - filtriranje po naslovu/autoru
//  - forma za dodavanje nove knjige
//  - conditional rendering (nema rezultata)
//
// Lista knjiga se sada čuva u state-u, tako da se može dodavati.

const pocetneKnjige = [
  { id: 1, naslov: "Na Drini ćuprija", autor: "Ivo Andrić", godina: 1945, cijena: 25 },
  { id: 2, naslov: "Derviš i smrt", autor: "Meša Selimović", godina: 1966, cijena: 30 },
  { id: 3, naslov: "Prokleta avlija", autor: "Ivo Andrić", godina: 1954, cijena: 20 },
  { id: 4, naslov: "Tvrđava", autor: "Meša Selimović", godina: 1970, cijena: 28 },
];

function Knjizara() {
  const [knjige, setKnjige] = useState(pocetneKnjige);
  const [pretraga, setPretraga] = useState("");

  // state za formu (svako polje svoj state)
  const [noviNaslov, setNoviNaslov] = useState("");
  const [noviAutor, setNoviAutor] = useState("");
  const [novaGodina, setNovaGodina] = useState("");
  const [novaCijena, setNovaCijena] = useState("");

  const filtrirane = knjige.filter(
    (k) =>
      k.naslov.toLowerCase().includes(pretraga.toLowerCase()) ||
      k.autor.toLowerCase().includes(pretraga.toLowerCase())
  );

  function dodajKnjigu(e) {
    e.preventDefault(); // sprečava refresh stranice

    if (!noviNaslov || !noviAutor) {
      alert("Naslov i autor su obavezni!");
      return;
    }

    const nova = {
      id: Date.now(), // jednostavan način za unique id
      naslov: noviNaslov,
      autor: noviAutor,
      godina: Number(novaGodina) || new Date().getFullYear(),
      cijena: Number(novaCijena) || 0,
    };

    // VAŽNO: koristimo spread da napravimo NOVI niz
    // Nikad ne mijenjamo state direktno (npr. knjige.push(...) je pogrešno)
    setKnjige([...knjige, nova]);

    // reset forme
    setNoviNaslov("");
    setNoviAutor("");
    setNovaGodina("");
    setNovaCijena("");
  }

  return (
    <div>
      <p className="opis">
        Knjižara iz v8, sada sa interaktivnošću: pretraga, lajkovanje, dodavanje.
      </p>

      {/* Pretraga */}
      <input
        type="text"
        value={pretraga}
        onChange={(e) => setPretraga(e.target.value)}
        placeholder="Pretraži po naslovu ili autoru..."
        style={{ width: "100%", marginBottom: "16px" }}
      />

      {/* Lista knjiga */}
      <h3 style={{ marginBottom: "8px" }}>
        Knjige ({filtrirane.length})
      </h3>

      {filtrirane.length === 0 ? (
        <p>Nema knjiga za pretragu "<strong>{pretraga}</strong>".</p>
      ) : (
        <div className="grid">
          {filtrirane.map((k) => (
            <BookCard
              key={k.id}
              naslov={k.naslov}
              autor={k.autor}
              godina={k.godina}
              cijena={k.cijena}
            />
          ))}
        </div>
      )}

      {/* Forma za novu knjigu */}
      <h3 style={{ marginTop: "32px" }}>Dodaj novu knjigu</h3>
      <form
        onSubmit={dodajKnjigu}
        style={{ display: "grid", gap: "8px", maxWidth: "400px" }}
      >
        <input
          value={noviNaslov}
          onChange={(e) => setNoviNaslov(e.target.value)}
          placeholder="Naslov *"
        />
        <input
          value={noviAutor}
          onChange={(e) => setNoviAutor(e.target.value)}
          placeholder="Autor *"
        />
        <input
          type="number"
          value={novaGodina}
          onChange={(e) => setNovaGodina(e.target.value)}
          placeholder="Godina izdanja"
        />
        <input
          type="number"
          value={novaCijena}
          onChange={(e) => setNovaCijena(e.target.value)}
          placeholder="Cijena (KM)"
        />
        <button type="submit">Dodaj knjigu</button>
      </form>
    </div>
  );
}

export default Knjizara;
