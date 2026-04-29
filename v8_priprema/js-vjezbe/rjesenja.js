// ============================================================
// MODERNI JAVASCRIPT - RJEŠENJA (za profesora)
// ============================================================


// ------------------------------------------------------------
// 1. LET I CONST
// ------------------------------------------------------------
let ime = "Ana";          // mijenja se -> let
ime = "Marko";

const PI = 3.14;          // ne mijenja se -> const

const korisnici = [];     // referenca se ne mijenja, samo sadržaj
korisnici.push("Ana");


// ------------------------------------------------------------
// 2. ARROW FUNCTIONS
// ------------------------------------------------------------
const pozdrav = (ime) => "Zdravo, " + ime;
// ili bez zagrada jer je samo jedan parametar:
const pozdrav2 = ime => "Zdravo, " + ime;

const jeParan = (n) => n % 2 === 0;

const sumaTri = (a, b, c) => a + b + c;


// ------------------------------------------------------------
// 3. TEMPLATE LITERALS
// ------------------------------------------------------------
// 3.1
const grad = "Sarajevo";
const drzava = "BiH";
const adresa = `Grad: ${grad}, Država: ${drzava}`;

// 3.2
const formatCijena = (broj) => `Cijena: ${broj} KM`;
console.log(formatCijena(50)); // "Cijena: 50 KM"


// ------------------------------------------------------------
// 4. DESTRUCTURING
// ------------------------------------------------------------
// 4.1
const korisnik = { ime: "Marko", email: "marko@test.com", aktivan: true };
const { ime: imeKorisnika, email } = korisnik;
// Napomena: moramo preimenovati 'ime' u 'imeKorisnika' jer smo 'ime' već koristili gore.
// U zasebnom fajlu bismo samo pisali: const { ime, email } = korisnik;

// 4.2
const ocjene = [10, 9, 8, 7];
const [prva, druga] = ocjene;
console.log(prva, druga); // 10 9

// 4.3
const formatProizvod = ({ ime, cijena }) => `Proizvod: ${ime}, cijena: ${cijena} KM`;
console.log(formatProizvod({ ime: "Laptop", cijena: 1200 }));
// "Proizvod: Laptop, cijena: 1200 KM"


// ------------------------------------------------------------
// 5. SPREAD I REST
// ------------------------------------------------------------
// 5.1
const a = [1, 2, 3];
const b = [4, 5, 6];
const spojeni = [...a, ...b]; // [1,2,3,4,5,6]

// 5.2
const knjiga = { naslov: "Na Drini ćuprija", autor: "Andrić", godina: 1945 };
const novaKnjiga = { ...knjiga, godina: 2020 };
// { naslov: "Na Drini ćuprija", autor: "Andrić", godina: 2020 }

// 5.3
const najveci = (...brojevi) => Math.max(...brojevi);
console.log(najveci(3, 7, 2, 9, 1)); // 9
// Napomena: i .max() ovdje koristi spread da "raširi" niz u argumente.


// ------------------------------------------------------------
// 6. ARRAY METODE
// ------------------------------------------------------------
const proizvodi = [
  { naziv: "Laptop", cijena: 1200 },
  { naziv: "Miš", cijena: 25 },
  { naziv: "Tastatura", cijena: 80 },
  { naziv: "Monitor", cijena: 300 },
];

// 6.1 - map
const nazivi = proizvodi.map((p) => p.naziv);
console.log(nazivi); // ["Laptop", "Miš", "Tastatura", "Monitor"]

// 6.2 - filter
const jeftini = proizvodi.filter((p) => p.cijena < 100);
console.log(jeftini); // [{Miš,25}, {Tastatura,80}]

// 6.3 - find
const tastatura = proizvodi.find((p) => p.naziv === "Tastatura");
console.log(tastatura); // { naziv: "Tastatura", cijena: 80 }

// 6.4 - map sa spread (važno: vraćamo NOVI objekt, ne mijenjamo originalni)
const saPopustom = proizvodi.map((p) => ({ ...p, cijena: p.cijena * 0.9 }));
console.log(saPopustom);
// Napomena: zagrade oko objekta su obavezne jer bi ih inače arrow fn
// shvatila kao blok koda {}.


// ------------------------------------------------------------
// 7. TERNARY OPERATOR
// ------------------------------------------------------------
// 7.1
const broj = 5;
const paranStatus = broj % 2 === 0 ? "paran" : "neparan";

// 7.2
const ocjena = 7;
const prolazStatus = ocjena >= 6 ? "prolaz" : "pad";

// 7.3
const pozdravImenu = (ime) => ime ? `Zdravo, ${ime}` : "Zdravo, gostu";
console.log(pozdravImenu("Ana"));  // "Zdravo, Ana"
console.log(pozdravImenu());       // "Zdravo, gostu"


// ------------------------------------------------------------
// 8. OPTIONAL CHAINING
// ------------------------------------------------------------
const narudzba = {
  id: 1,
  kupac: { ime: "Ana" },
};

const gradKupca = narudzba?.kupac?.adresa?.grad;
console.log(gradKupca); // undefined (ne puca)


// ------------------------------------------------------------
// 9. IMPORT / EXPORT
// ------------------------------------------------------------
// Primjer se nalazi u fajlovima:
//   - utils-primjer.js
//   - app-primjer.js
