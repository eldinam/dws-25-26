import { useState } from "react";

// PRIMJER 2: useState sa boolean vrijednošću
// Kombinuje se sa "conditional rendering" - prikazuje ili ne prikazuje sadržaj.
// Operator && je kratak oblik uslovnog prikazivanja:
//   {uslov && <Element />}  -> prikaži Element samo ako je uslov true

function Toggle() {
  const [prikazan, setPrikazan] = useState(false);

  return (
    <div>
      <button onClick={() => setPrikazan(!prikazan)}>
        {prikazan ? "Sakrij tekst" : "Prikaži tekst"}
      </button>

      {prikazan && (
        <p style={{ marginTop: "12px", padding: "10px", background: "#f0f8ff", borderRadius: "6px" }}>
          Ovo je skriveni sadržaj koji se pojavljuje kad klikneš dugme.
        </p>
      )}
    </div>
  );
}

export default Toggle;
