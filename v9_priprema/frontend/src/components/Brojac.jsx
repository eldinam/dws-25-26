import { useState } from "react";

// PRIMJER 1: useState sa brojem
// Prikazuje najjednostavniju upotrebu useState hooka.
// Kad se klikne dugme, funkcija setBroj mijenja state,
// i React automatski ponovo renderuje komponentu.

function Brojac() {
  const [broj, setBroj] = useState(0);

  return (
    <div>
      <p style={{ fontSize: "1.5rem" }}>
        Vrijednost: <strong>{broj}</strong>
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setBroj(broj + 1)}>+1</button>
        <button onClick={() => setBroj(broj - 1)}>-1</button>
        <button className="secondary" onClick={() => setBroj(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Brojac;
