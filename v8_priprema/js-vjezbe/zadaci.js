// ============================================================
// MODERNI JAVASCRIPT - MINI ZADACI ZA V8
// ============================================================
// Pokretanje: node zadaci.js
// ili kopiraj pojedinačne dijelove u browser konzolu (F12)
// ============================================================


// ------------------------------------------------------------
// 1. LET I CONST
// ------------------------------------------------------------
// Zadatak: Ispravi greške ispod - zamijeni `var` sa `const` ili `let`.

var ime = "Ana";
ime = "Marko";

var PI = 3.14;
// PI se ne smije mijenjati

var korisnici = [];
korisnici.push("Ana");


// ------------------------------------------------------------
// 2. ARROW FUNCTIONS
// ------------------------------------------------------------
// Zadatak: Prepiši funkcije kao arrow functions.

function pozdrav(ime) {
  return "Zdravo, " + ime;
}

function jeParan(n) {
  return n % 2 === 0;
}

function sumaTri(a, b, c) {
  return a + b + c;
}


// ------------------------------------------------------------
// 3. TEMPLATE LITERALS
// ------------------------------------------------------------
// Zadatak 3.1: Prepiši koristeći template literal.
const grad = "Sarajevo";
const drzava = "BiH";
const adresa = "Grad: " + grad + ", Država: " + drzava;

// Zadatak 3.2: Napiši funkciju formatCijena(broj) koja vraća "Cijena: XX KM"
// Primjer: formatCijena(50) → "Cijena: 50 KM"


// ------------------------------------------------------------
// 4. DESTRUCTURING
// ------------------------------------------------------------
// Zadatak 4.1: Izvuci ime i email iz objekta.
const korisnik = { ime: "Marko", email: "marko@test.com", aktivan: true };
// const { ... } = korisnik;

// Zadatak 4.2: Izvuci prva dva elementa niza.
const ocjene = [10, 9, 8, 7];

// Zadatak 4.3: Napiši funkciju koja prima objekt { ime, cijena } i vraća
// string "Proizvod: X, cijena: Y KM". Koristi destructuring u parametrima.


// ------------------------------------------------------------
// 5. SPREAD I REST
// ------------------------------------------------------------
// Zadatak 5.1: Spoji dva niza u jedan.
const a = [1, 2, 3];
const b = [4, 5, 6];
// Očekivano: [1,2,3,4,5,6]

// Zadatak 5.2: Napravi kopiju objekta i promijeni godinu na 2020.
const knjiga = { naslov: "Na Drini ćuprija", autor: "Andrić", godina: 1945 };

// Zadatak 5.3: Napiši funkciju koja prima neograničen broj argumenata
// i vraća najveći broj. Koristi rest operator.
// Primjer: najveci(3, 7, 2, 9, 1) → 9


// ------------------------------------------------------------
// 6. ARRAY METODE (map, filter, find)
// ------------------------------------------------------------
const proizvodi = [
  { naziv: "Laptop", cijena: 1200 },
  { naziv: "Miš", cijena: 25 },
  { naziv: "Tastatura", cijena: 80 },
  { naziv: "Monitor", cijena: 300 },
];

// Zadatak 6.1: Napravi niz svih naziva proizvoda.

// Zadatak 6.2: Napravi niz proizvoda koji koštaju manje od 100.

// Zadatak 6.3: Pronađi proizvod koji se zove "Tastatura".

// Zadatak 6.4: Napravi niz sa popustom 10% (cijena * 0.9).
// Očekivano: [{ naziv: "Laptop", cijena: 1080 }, ...]


// ------------------------------------------------------------
// 7. TERNARY OPERATOR
// ------------------------------------------------------------
// Zadatak 7.1: Napiši ternary koji vraća "paran" ili "neparan" za broj.

// Zadatak 7.2: Napiši ternary koji za ocjenu vraća "prolaz" (>=6) ili "pad".

// Zadatak 7.3: Napiši funkciju pozdrav(ime) koja vraća
// "Zdravo, X" ako ime postoji, inače "Zdravo, gostu".


// ------------------------------------------------------------
// 8. OPTIONAL CHAINING
// ------------------------------------------------------------
const narudzba = {
  id: 1,
  kupac: { ime: "Ana" },
  // adresa: nedostaje!
};

// Zadatak: Izvuci grad kupca bez da kod puca.
// Ako nema grada, rezultat treba biti undefined.


// ------------------------------------------------------------
// 9. IMPORT / EXPORT
// ------------------------------------------------------------
// Ovaj zadatak radi se u 2 fajla:
//
// utils.js
//   - export named funkcije: saberi(a,b), oduzmi(a,b)
//   - export default funkcija: pomnozi(a,b)
//
// app.js
//   - importuj sve tri i pozovi ih
//
// Napomena: za ES module sintaksu u Node.js, u package.json treba staviti
//   "type": "module"
// ili koristi .mjs ekstenziju.
