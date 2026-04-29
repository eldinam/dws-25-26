import { useEffect, useState } from "react";

function PrimjerUseEffecta() {
  const [test, setTest] = useState("Tekst");

  // Sintaksa
  // useEffect(() => {
  //   // kod koji se izvršava
  // }, [zavisnosti]);

  // 1.
  // [] - pokreće se samo jednom
  useEffect(() => {
    // kod koji se izvršava
  }, []);

  // 2.
  // [a, b] - pokreće se kad god se a ili b promijene
  // useEffect(() => {
  //   // kod koji se izvršava
  // }, [a, b]);

  // 3.
  //  - pokreće se nakon svakog rendera (rijetko koristi)
  useEffect(() => {
    // kod koji se izvršava
  });

  return <h1>{test}</h1>;
}

export default PrimjerUseEffecta;
