// Primjer za zadatak 9 - Import/Export

// named exports
export const saberi = (a, b) => a + b;
export const oduzmi = (a, b) => a - b;

// default export (samo jedan po fajlu)
export default function pomnozi(a, b) {
  return a * b;
}
