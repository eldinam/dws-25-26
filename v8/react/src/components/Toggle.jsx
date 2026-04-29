import { useState } from "react";

function Toggle() {
  const [prikazan, setPrikazan] = useState(false);

  return (
    <div>
      <button onClick={() => setPrikazan(!prikazan)}>
        {prikazan ? "Sakrij" : "Prikaži"}
      </button>

      {prikazan && <p>Skriveni sadržaj!</p>}
    </div>
  );
}

export default Toggle;
