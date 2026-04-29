import { useState } from "react";

function UnosImena() {
  const [ime, setIme] = useState("");

  console.log(ime);
  return (
    <div>
      <input
        type="text"
        value={ime}
        placeholder="Unesi ime..."
        onChange={(e) => setIme(e.target.value)}
      />
      <p>Zdravo, {ime || "nepoznati"}!</p>
    </div>
  );
}

export default UnosImena;
