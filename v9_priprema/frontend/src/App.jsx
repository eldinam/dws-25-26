import Brojac from "./components/Brojac.jsx";
import Toggle from "./components/Toggle.jsx";
import UnosImena from "./components/UnosImena.jsx";
import PretragaStudenata from "./components/PretragaStudenata.jsx";
import PromjenaNaslova from "./components/PromjenaNaslova.jsx";
import Korisnici from "./components/Korisnici.jsx";
import Knjizara from "./components/Knjizara.jsx";

// App sluzi kao demo stranica sa sekcijama.
// Svaka sekcija pokazuje jedan koncept iz v9.
// Idi po redu kroz sekcije kad pokazujes studentima.

function App() {
  return (
    <div className="container">
      <header style={{ textAlign: "center", padding: "24px 0" }}>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "4px" }}>
          V9 — React Hookovi i state
        </h1>
        <p style={{ color: "#6c757d", margin: 0 }}>
          useState · useEffect · forme · fetch
        </p>
      </header>

      <section>
        <h2>1. Brojač (useState sa brojem)</h2>
        <p className="opis">
          Najjednostavniji primjer useState hooka. State drži broj, dugmad ga mijenjaju.
          Primijeti da ne možemo direktno mijenjati "broj" varijablu - moramo
          koristiti setBroj funkciju.
        </p>
        <Brojac />
      </section>

      <section>
        <h2>2. Toggle (useState sa boolean)</h2>
        <p className="opis">
          Boolean state + conditional rendering sa operatorom &&.
          Prikazuje ili sakriva sadržaj na osnovu state-a.
        </p>
        <Toggle />
      </section>

      <section>
        <h2>3. Controlled input</h2>
        <p className="opis">
          Input polje čija je vrijednost povezana sa state-om.
          onChange pokreće setIme pri svakom znaku. Komponenta se re-renderuje
          pri svakom pritisku tipke.
        </p>
        <UnosImena />
      </section>

      <section>
        <h2>4. Pretraga (filter + map + conditional)</h2>
        <p className="opis">
          Kombinacija svega do sad: controlled input za pretragu,
          filtriranje niza, map za renderovanje, ternary za poruku kad nema rezultata.
        </p>
        <PretragaStudenata />
      </section>

      <section>
        <h2>5. useEffect (side effect)</h2>
        <p className="opis">
          useEffect pokreće kod nakon rendera. Ovdje mijenjamo naslov browser taba.
          Dependency array [brojKlikova] znaci: "pokreni ponovo kad se brojKlikova promijeni".
        </p>
        <PromjenaNaslova />
      </section>

      <section>
        <h2>6. Fetch sa API-ja</h2>
        <p className="opis">
          Najvažniji primjer: kako dovući podatke sa servera.
          Tri stanja: loading, error, success. Koristimo besplatni JSONPlaceholder API.
        </p>
        <Korisnici />
      </section>

      <section>
        <h2>7. Knjižara - sve zajedno</h2>
        <p className="opis">
          Nastavak iz v8. Spojeno u jedan kompletan primjer:
          lista u state-u, pretraga, lajkovanje svake kartice, forma za dodavanje nove knjige.
        </p>
        <Knjizara />
      </section>

      <footer style={{ textAlign: "center", padding: "24px", color: "#6c757d", fontSize: "0.9rem" }}>
        DWS 2025-2026 · Vježba 9
      </footer>
    </div>
  );
}

export default App;
