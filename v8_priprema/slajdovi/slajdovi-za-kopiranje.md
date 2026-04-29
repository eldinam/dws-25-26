# V8 - SLAJDOVI ZA GOOGLE SLIDES (copy-paste)

Svaki "SLAJD" ispod = jedan slajd u Google Slides.
Kopiraj naslov u title, sadržaj u body.

=============================================================
SLAJD 1 - NASLOVNA
=============================================================

NASLOV:
Vježba 8 - Uvod u React

PODNASLOV:
React i moderni JavaScript
DWS 2025-2026 · PMF
Eldina Delalić


=============================================================
SLAJD 2 - AGENDA
=============================================================

NASLOV:
Šta ćemo danas

SADRŽAJ:
• Šta je React i zašto ga koristimo
• Moderni JavaScript - osvježenje
• Vite - postavljanje React projekta
• JSX - spoj HTML-a i JavaScript-a
• Prva komponenta
• Props i odnos roditelj-dijete
• Mini zadatak


=============================================================
SLAJD 3 - ŠTA JE REACT
=============================================================

NASLOV:
Šta je React?

SADRŽAJ:
• JavaScript biblioteka za gradnju korisničkih interfejsa
• Razvio Facebook (Meta) - 2013. godine
• Open source - besplatan za upotrebu
• Danas najpopularnija biblioteka za frontend
• Omogućava pisanje reusable komponenti (UI dijelova)

NAPOMENA (ne obavezno na slajdu):
Nije framework (kao Angular) - biblioteka koja radi jednu stvar: gradi UI.


=============================================================
SLAJD 4 - ZAŠTO REACT
=============================================================

NASLOV:
Zašto React?

SADRŽAJ (u 2 kolone):

PREDNOSTI:
• Ogromna zajednica
• Mnogo resursa i biblioteka
• Velika tržišna potražnja
• Jednostavan koncept komponenti
• Brz (Virtual DOM)

KO GA KORISTI:
• Meta (Facebook, Instagram, WhatsApp)
• Netflix
• Airbnb
• Uber
• Dropbox
• Shopify
• Discord


=============================================================
SLAJD 5 - SPA vs MPA
=============================================================

NASLOV:
SPA vs MPA

SADRŽAJ (u 2 kolone):

MPA - Multi Page App:
• Svaki klik = novi zahtjev serveru
• Server šalje novi HTML
• Cijela stranica se reloada
• Primjer: klasični PHP/Django sajtovi

SPA - Single Page App:
• Jedna HTML stranica
• JS dinamički mijenja sadržaj
• Nema reload-a cijele stranice
• Brže, bolji UX
• React, Vue, Angular

NAPOMENA NA DNU:
React gradi SPA aplikacije.


=============================================================
SLAJD 6 - KOMPONENTE
=============================================================

NASLOV:
Komponente

SADRŽAJ:
React aplikacija = stablo komponenti

DIJAGRAM (dodaj kao sliku ili tekst):
          <App>
         /      \
    <Header>   <Main>
               /    \
       <StudentList> <Footer>
             |
       <StudentCard>

BULLET TAČKE:
• Svaka komponenta je samostalan dio UI-a
• Može se ponovo koristiti
• Može imati svoje podatke i logiku

NAPOMENA:
Razmišljaj o komponentama kao LEGO kockicama.


=============================================================
SLAJD 7 - DEKLARATIVNO vs IMPERATIVNO
=============================================================

NASLOV:
Deklarativno vs Imperativno

SADRŽAJ (u 2 kolone):

IMPERATIVNO (vanilla JS) - "KAKO" uraditi:

const el = document.getElementById("x");
el.innerHTML = "";
for (let i = 0; i < items.length; i++) {
  const div = document.createElement("div");
  div.textContent = items[i].name;
  el.appendChild(div);
}

DEKLARATIVNO (React) - "ŠTA" želim vidjeti:

<div>
  {items.map(item => (
    <div>{item.name}</div>
  ))}
</div>

NAPOMENA NA DNU:
Ti opisuješ kako UI treba izgledati, React brine kako doći do tog stanja.


=============================================================
SLAJD 8 - VIRTUAL DOM
=============================================================

NASLOV:
Virtual DOM

SADRŽAJ:
Problem: Pristup pravom DOM-u je spor.
Rješenje: React drži kopiju DOM-a u memoriji (Virtual DOM).

TOK:
Promjena stanja
     ↓
Novi Virtual DOM
     ↓
Upoređivanje sa starim (diffing)
     ↓
Mijenja se SAMO ono što je promijenjeno u pravom DOM-u

NAPOMENA:
Zato je React brz - ne re-renderuje cijelu stranicu, samo delte.


=============================================================
SLAJD 9 - SEKCIJA: MODERNI JS
=============================================================

VELIKI NASLOV (centriran):
Moderni JavaScript

PODNASLOV:
Osvježenje prije React-a


=============================================================
SLAJD 10 - MODERNI JS TEME
=============================================================

NASLOV:
Šta ćemo proći

SADRŽAJ:
1. let i const (ne više var)
2. Arrow functions  () => {}
3. Template literals  `Zdravo ${ime}`
4. Destructuring  const { a, b } = obj
5. Spread / rest  ...
6. Array metode  .map(), .filter(), .find()
7. Ternary operator  a ? b : c
8. Optional chaining  obj?.a?.b
9. Import / export - moduli

NAPOMENA:
Sve ovo ćemo vidjeti u svakom React projektu.


=============================================================
SLAJD 11 - LET I CONST
=============================================================

NASLOV:
let i const

SADRŽAJ:

const pi = 3.14;        // ne mijenja se
let brojac = 0;         // mijenja se
brojac = brojac + 1;    // OK

// const sprječava promjenu REFERENCE, ne sadržaja
const niz = [1, 2, 3];
niz.push(4);            // OK!

PRAVILO:
Počni s const, prebaci u let samo ako treba.


=============================================================
SLAJD 12 - ARROW FUNCTIONS
=============================================================

NASLOV:
Arrow functions

SADRŽAJ:

// klasična funkcija
function saberi(a, b) { return a + b; }

// arrow function
const saberi = (a, b) => a + b;

// samo jedan parametar
const kvadrat = n => n * n;

// bez parametara
const pozdravi = () => "Zdravo!";

NAPOMENA:
U React-u ih koristimo svuda - callbacks, event handleri, komponente.


=============================================================
SLAJD 13 - TEMPLATE LITERALS
=============================================================

NASLOV:
Template literals

SADRŽAJ:
Umjesto spajanja stringova sa +, koristimo backticks.

const ime = "Ana";
const godine = 20;

// staro
const poruka = "Zdravo, " + ime + "!";

// novo
const poruka = `Zdravo, ${ime}! Imaš ${godine} godina.`;

• Varijable i izrazi idu u ${...}
• Mogu i višeredni stringovi


=============================================================
SLAJD 14 - DESTRUCTURING
=============================================================

NASLOV:
Destructuring

SADRŽAJ:
Izvlačenje vrijednosti iz objekta ili niza.

const student = { ime: "Ana", godine: 20 };

// staro
const ime = student.ime;

// novo
const { ime, godine } = student;

U PARAMETRIMA FUNKCIJE (za props!):

function prikazi({ ime, godine }) {
  return `${ime}, ${godine}`;
}
prikazi({ ime: "Ana", godine: 20 });


=============================================================
SLAJD 15 - SPREAD I REST
=============================================================

NASLOV:
Spread i rest  (...)

SADRŽAJ:

SPREAD - raširi niz/objekt:

const a = [1, 2, 3];
const b = [...a, 4, 5];           // [1,2,3,4,5]

const s1 = { ime: "Ana" };
const s2 = { ...s1, godine: 20 }; // { ime, godine }

REST - skupi ostatak:

function suma(...brojevi) {
  return brojevi.reduce((a, b) => a + b, 0);
}
suma(1, 2, 3, 4); // 10


=============================================================
SLAJD 16 - ARRAY METODE
=============================================================

NASLOV:
Array metode - map, filter, find

SADRŽAJ:

const brojevi = [1, 2, 3, 4, 5];

brojevi.map(n => n * 2);     // [2,4,6,8,10]
brojevi.filter(n => n > 2);  // [3,4,5]
brojevi.find(n => n === 3);  // 3

NAPOMENA:
.map() je NAJVAŽNIJA - koristimo je za renderovanje listi u React-u.

PRIMJER U REACT-U:
{studenti.map(s => <StudentCard ime={s.ime} />)}


=============================================================
SLAJD 17 - TERNARY I OPTIONAL CHAINING
=============================================================

NASLOV:
Ternary i Optional chaining

SADRŽAJ:

TERNARY - kraći if/else:

const status = godine >= 18 ? "punoljetan" : "maloljetan";

U React-u za conditional rendering:

{ulogovan ? <p>Dobrodošli!</p> : <p>Prijavite se</p>}

OPTIONAL CHAINING - sigurno pristupanje:

const grad = student?.adresa?.grad;  // undefined, ne puca


=============================================================
SLAJD 18 - IMPORT / EXPORT
=============================================================

NASLOV:
Import / Export

SADRŽAJ:

// utils.js
export const PI = 3.14;                  // named
export default function hello() {}        // default

// app.js
import hello, { PI } from "./utils.js";

• Default export - jedan po fajlu, bez {} pri importu
• Named export - više po fajlu, u {} pri importu
• React komponente se export-uju kao default


=============================================================
SLAJD 19 - SEKCIJA: REACT U PRAKSI
=============================================================

VELIKI NASLOV (centriran):
React u praksi


=============================================================
SLAJD 20 - VITE SETUP
=============================================================

NASLOV:
Vite - setup projekta

SADRŽAJ:
Alat za pokretanje modernih frontend projekata.
Brz, jednostavan, preporučen.

KOMANDE:

npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev

STRUKTURA:
• index.html - jedina HTML stranica
• src/main.jsx - entry point
• src/App.jsx - glavna komponenta
• package.json - dependencies i skripte


=============================================================
SLAJD 21 - JSX
=============================================================

NASLOV:
JSX - šta je?

SADRŽAJ:
JSX = JavaScript + HTML sintaksa

function App() {
  const ime = "Ana";
  return (
    <div>
      <h1>Zdravo, {ime}!</h1>
    </div>
  );
}

• Nije HTML - prevodi se u JS pozive
• Dozvoljava pisanje "HTML-a" unutar JS-a
• {...} unutar JSX-a = bilo koji JS izraz


=============================================================
SLAJD 22 - JSX vs HTML (TABELA)
=============================================================

NASLOV:
JSX vs HTML

TABELA (2 kolone):

HTML                      |  JSX
--------------------------|----------------------------
class="card"              |  className="card"
for="email"               |  htmlFor="email"
onclick="..."             |  onClick={...}
<br>                      |  <br />  (samozatvoren)
više root elemenata OK    |  jedan root (ili <>...</>)
atributi su stringovi     |  JS izrazi u {...}

PRIMJER:
<input className="input" onChange={handleChange} />


=============================================================
SLAJD 23 - KOMPONENTA = FUNKCIJA
=============================================================

NASLOV:
Komponenta = funkcija

SADRŽAJ:
Komponenta u React-u je obična JS funkcija koja vraća JSX.

function Pozdrav() {
  return <h1>Zdravo, svijete!</h1>;
}

export default Pozdrav;

PRAVILA:
• Ime komponente mora počinjati velikim slovom
• Vraća jedan JSX element
• Koristi se kao HTML tag:  <Pozdrav />
• Svaka komponenta u svom fajlu (.jsx)


=============================================================
SLAJD 24 - PROPS
=============================================================

NASLOV:
Props - prosljeđivanje podataka

SADRŽAJ:
Props = "properties" - podaci iz roditelja u dijete.

// DIJETE
function StudentCard({ ime, godine }) {
  return (
    <div>
      <h2>{ime}</h2>
      <p>{godine} godina</p>
    </div>
  );
}

// RODITELJ
function App() {
  return <StudentCard ime="Ana" godine={20} />;
}


=============================================================
SLAJD 25 - PROPS PRAVILA
=============================================================

NASLOV:
Props - pravila

SADRŽAJ:
• Read-only - dijete NE SMIJE mijenjati props
• Stringovi idu u "", ostalo u {}:

  <Card ime="Ana" godine={20} aktivan={true} />

• Destructuring u potpisu funkcije je preporučen stil:

  function Card({ ime, godine }) { ... }

• Data flow je jednosmjeran - samo odozgo nadolje

NAPOMENA:
Props su nepromjenljivi. Za mijenjanje ćemo koristiti "state" - v9.


=============================================================
SLAJD 26 - KOMPOZICIJA
=============================================================

NASLOV:
Kompozicija komponenti

SADRŽAJ:
Roditelj može renderovati više djece.

function App() {
  return (
    <div>
      <Header naslov="Moja aplikacija" />
      <StudentCard ime="Ana" godine={20} />
      <StudentCard ime="Marko" godine={22} />
      <Footer />
    </div>
  );
}

Komponente se spajaju i grade složene UI-e iz jednostavnih dijelova.


=============================================================
SLAJD 27 - SEKCIJA: MINI ZADATAK
=============================================================

VELIKI NASLOV (centriran):
Mini zadatak


=============================================================
SLAJD 28 - ZADATAK KNJIŽARA
=============================================================

NASLOV:
Zadatak - Knjižara

SADRŽAJ:
Napraviti aplikaciju koja prikazuje listu knjiga.

ZAHTJEVI:
1. Komponenta BookCard sa props:
   naslov, autor, godinaIzdanja, cijena
2. U App.jsx prikazati najmanje 4 knjige
3. Zaglavlje "Dobrodošli u knjižaru"
4. Stilizovati kartice (border, padding, margin)

BONUS:
• Komponenta Header za naslov stranice
• Komponenta Footer sa kontaktom


=============================================================
SLAJD 29 - PROVJERA ZNANJA
=============================================================

NASLOV:
Šta treba znati na kraju v8

SADRŽAJ:
✓ Šta je React i zašto se koristi
✓ Razlika SPA vs MPA
✓ Moderni JS: arrow, destructuring, spread, map/filter
✓ Setup Vite projekta
✓ JSX - šta je i razlike od HTML-a
✓ Kreiranje komponente
✓ Props - prosljeđivanje i destructuring
✓ Odnos roditelj - dijete

NAPOMENA:
U v9 dodajemo interaktivnost: state, hookovi, forme, fetch.


=============================================================
SLAJD 30 - KRAJ
=============================================================

VELIKI NASLOV (centriran):
Hvala!

PODNASLOV:
Pitanja?

TEKST NA DNU:
Nastavljamo s Vite setupom uživo.
