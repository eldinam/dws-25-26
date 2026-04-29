import { useState, useEffect } from "react";

// PRIMJER 5: useEffect - side effects
// useEffect izvršava kod NAKON rendera.
// Dependency array [brojKlikova] znači:
//   "ponovo pokreni effect svaki put kad se brojKlikova promijeni"
//
// Ako bi dep array bio [], effect bi se pokrenuo samo jednom (na mountu).
// Ako bi bio izostavljen, pokrenuo bi se nakon SVAKOG rendera.

function PromjenaNaslova() {
  const [brojKlikova, setBrojKlikova] = useState(0);

  useEffect(() => {
    // ovo je side effect - mijenja nešto izvan komponente (browser tab)
    document.title = `Klikova: ${brojKlikova} - V9`;
  }, [brojKlikova]);

  return (
    <div>
      <p>Broj klikova: <strong>{brojKlikova}</strong></p>
      <button onClick={() => setBrojKlikova(brojKlikova + 1)}>
        Klikni me
      </button>
      <button
        className="secondary"
        onClick={() => setBrojKlikova(0)}
        style={{ marginLeft: "8px" }}
      >
        Reset
      </button>
      <p className="opis" style={{ marginTop: "16px" }}>
        Pogledaj naslov taba u browseru - mijenja se svaki put kad klikneš!
      </p>
    </div>
  );
}

export default PromjenaNaslova;
