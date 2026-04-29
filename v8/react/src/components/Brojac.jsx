import { useState } from "react";

function Brojac() {
  const [broj, setBroj] = useState(0);

  function povecaj() {
    setBroj(broj + 1);

    console.log(broj);
  }
  return (
    <div>
      <h2>Vrijednost: {broj}</h2>
      <button onClick={() => setBroj(broj + 1)}>+</button>
      <button onClick={() => setBroj(broj - 1)}>-</button>
      <button onClick={() => setBroj(0)}>Reset</button>
    </div>
  );
}

export default Brojac;
