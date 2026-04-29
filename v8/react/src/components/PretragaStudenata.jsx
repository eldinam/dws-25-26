import { useState } from "react";

function PretragaStudenata() {
  const [pretraga, setPretraga] = useState("");

  const studenti = [
    { id: 1, ime: "Ahmed" },
    { id: 2, ime: "Semir" },
    { id: 3, ime: "Martina" },
    { id: 4, ime: "Merjem" },
    { id: 5, ime: "Ajla" },
  ];

  const filtrirani = studenti.filter((s) =>
    s.ime.toLocaleLowerCase().includes(pretraga.toLocaleLowerCase()),
  );

  return (
    <div>
      <input
        value={pretraga}
        placeholder="Pretraži..."
        onChange={(e) => setPretraga(e.target.value)}
      />

      {filtrirani.length === 0 ? (
        <p>Nema rezultata za "{pretraga}"</p>
      ) : (
        <ul>
          {filtrirani.map((s) => (
            <li key={s.id}>{s.ime}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PretragaStudenata;
