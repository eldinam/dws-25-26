---
theme: default
title: V8 - Uvod u React
author: Eldina Delalić
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  DWS 2025-2026 - Vježba 8
  Uvod u React i moderni JavaScript
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Vježba 8
## Uvod u React i moderni JavaScript

DWS 2025-2026 · PMF

<div class="pt-12">
  <span class="text-sm opacity-50">Eldina Delalić</span>
</div>

---

# Šta ćemo danas

- Šta je **React** i zašto ga koristimo
- **Moderni JavaScript** - osvježenje
- **Vite** - postavljanje React projekta
- **JSX** - spoj HTML-a i JavaScript-a
- Prva **komponenta**
- **Props** i odnos roditelj-dijete
- Mini zadatak

---

# Šta je React?

- **JavaScript biblioteka** za gradnju korisničkih interfejsa
- Razvio **Facebook (Meta)** - 2013. godine
- **Open source** - svako može koristiti i doprinositi
- Danas **najpopularnija** biblioteka za frontend
- Omogućava nam da pišemo **reusable komponente** (UI dijelove)

<div class="mt-8 text-sm opacity-70">
Nije framework (kao Angular) - biblioteka koja radi jednu stvar: gradi UI.
</div>

---

# Zašto React?

<div class="grid grid-cols-2 gap-8">

<div>

## Prednosti
- Ogromna zajednica
- Mnogo resursa i biblioteka
- Velika tržišna potražnja
- Jednostavan koncept komponenti
- Brz (Virtual DOM)

</div>

<div>

## Ko ga koristi
- Meta (Facebook, Instagram, WhatsApp)
- Netflix
- Airbnb
- Uber
- Dropbox
- Shopify
- Discord

</div>

</div>

---

# SPA vs MPA

<div class="grid grid-cols-2 gap-8">

<div>

## MPA - Multi Page App
- Svaki klik = **novi zahtjev serveru**
- Server šalje **novi HTML**
- Cijela stranica se **reloada**
- Primjer: klasični PHP/Django sajtovi

</div>

<div>

## SPA - Single Page App
- **Jedna** HTML stranica
- JS **dinamički** mijenja sadržaj
- **Nema reload-a** cijele stranice
- Brže, bolji UX
- React, Vue, Angular

</div>

</div>

<div class="mt-8 text-center text-sm opacity-70">
React gradi SPA aplikacije.
</div>

---

# Komponente

React aplikacija = **stablo komponenti**

```
            <App>
         /        \
    <Header>      <Main>
                 /      \
          <StudentList>  <Footer>
              |
         <StudentCard>
```

- Svaka komponenta je **samostalan dio UI-a**
- Može se **ponovo koristiti**
- Može imati **svoje podatke i logiku**

<div class="mt-6 text-sm opacity-70">
Razmišljaj o komponentama kao o LEGO kockicama - male, reusable, spajaju se u veće cjeline.
</div>

---

# Deklarativno vs Imperativno

<div class="grid grid-cols-2 gap-6">

<div>

## Imperativno (vanilla JS)
*"Kako" uraditi*

```js
const el = document.getElementById("x");
el.innerHTML = "";
for (let i = 0; i < items.length; i++) {
  const div = document.createElement("div");
  div.textContent = items[i].name;
  el.appendChild(div);
}
```

</div>

<div>

## Deklarativno (React)
*"Šta" želim vidjeti*

```jsx
<div>
  {items.map(item => (
    <div>{item.name}</div>
  ))}
</div>
```

</div>

</div>

<div class="mt-6 text-center text-sm opacity-70">
Ti opisuješ kako UI treba izgledati, React brine kako doći do tog stanja.
</div>

---

# Virtual DOM

**Problem:** Pristup pravom DOM-u je spor.

**Rješenje:** React drži **kopiju DOM-a u memoriji** (Virtual DOM).

<div class="mt-8">

```
Promjena stanja
      ↓
Novi Virtual DOM
      ↓
Upoređivanje sa starim (diffing)
      ↓
Mijenja se SAMO ono što je promijenjeno u pravom DOM-u
```

</div>

<div class="mt-8 text-sm opacity-70">
Zato je React brz - ne re-renderuje cijelu stranicu, samo delte.
</div>

---
layout: section
---

# Moderni JavaScript
## Osvježenje prije React-a

---

# Moderni JS - šta ćemo proći

1. **`let` i `const`** (ne više `var`)
2. **Arrow functions** `() => {}`
3. **Template literals** `` `Zdravo ${ime}` ``
4. **Destructuring** `const { a, b } = obj`
5. **Spread / rest** `...`
6. **Array metode** `.map()`, `.filter()`, `.find()`
7. **Ternary operator** `a ? b : c`
8. **Optional chaining** `obj?.a?.b`
9. **Import / export** - moduli

<div class="mt-6 text-sm opacity-70">
Sve ovo ćemo vidjeti u svakom React projektu.
</div>

---

# let i const

```js
const pi = 3.14;        // ne mijenja se
let brojac = 0;          // mijenja se
brojac = brojac + 1;     // OK

// const sprječava promjenu REFERENCE, ne sadržaja
const niz = [1, 2, 3];
niz.push(4);             // OK!
```

**Pravilo:** Počni s `const`, prebaci u `let` samo ako treba.

---

# Arrow functions

```js
// klasična funkcija
function saberi(a, b) { return a + b; }

// arrow function
const saberi = (a, b) => a + b;

// samo jedan parametar - ne trebaju zagrade
const kvadrat = n => n * n;

// bez parametara
const pozdravi = () => "Zdravo!";
```

U React-u ih koristimo **svuda** - callbacks, event handleri, komponente.

---

# Template literals

Umjesto spajanja stringova sa `+`, koristimo **backticks** (`` ` ``):

```js
const ime = "Ana";
const godine = 20;

// staro
const poruka = "Zdravo, " + ime + "! Imaš " + godine + " godina.";

// novo
const poruka = `Zdravo, ${ime}! Imaš ${godine} godina.`;
```

- Varijable i izrazi idu u `${...}`
- Mogu i višeredni stringovi

---

# Destructuring

Izvlačenje vrijednosti iz objekta/niza u varijable.

```js
const student = { ime: "Ana", godine: 20 };

// staro
const ime = student.ime;

// novo
const { ime, godine } = student;
```

**Destructuring u parametrima funkcije** (koristit ćemo za props!):

```js
function prikazi({ ime, godine }) {
  return `${ime}, ${godine}`;
}
prikazi({ ime: "Ana", godine: 20 });
```

---

# Spread i rest (`...`)

**Spread** - "raširi" niz/objekt:
```js
const a = [1, 2, 3];
const b = [...a, 4, 5];              // [1,2,3,4,5]

const s1 = { ime: "Ana" };
const s2 = { ...s1, godine: 20 };    // { ime: "Ana", godine: 20 }
```

**Rest** - "skupi ostatak":
```js
function suma(...brojevi) {
  return brojevi.reduce((a, b) => a + b, 0);
}
suma(1, 2, 3, 4); // 10
```

<div class="mt-4 text-sm opacity-70">
Ovo ćemo stalno koristiti za state update u React-u.
</div>

---

# Array metode - map, filter, find

```js
const brojevi = [1, 2, 3, 4, 5];

brojevi.map(n => n * 2);        // [2,4,6,8,10]
brojevi.filter(n => n > 2);     // [3,4,5]
brojevi.find(n => n === 3);     // 3
```

**`.map()` je NAJVAŽNIJA** - koristimo je za renderovanje listi u React-u.

```jsx
{studenti.map(s => <StudentCard ime={s.ime} />)}
```

---

# Ternary i Optional chaining

**Ternary** - kraći `if/else`:
```js
const status = godine >= 18 ? "punoljetan" : "maloljetan";
```
U React-u za **conditional rendering**:
```jsx
{ulogovan ? <p>Dobrodošli!</p> : <p>Prijavite se</p>}
```

**Optional chaining** - sigurno pristupanje svojstvima:
```js
const grad = student?.adresa?.grad;  // undefined, ne puca
```

---

# Import / Export

```js
// utils.js
export const PI = 3.14;                        // named
export default function hello() {}              // default

// app.js
import hello, { PI } from "./utils.js";
```

- **Default export** - jedan po fajlu, bez `{}` pri importu
- **Named export** - više po fajlu, u `{}` pri importu
- React komponente se export-uju kao **default**

---
layout: section
---

# React u praksi

---

# Vite - setup projekta

Alat za pokretanje modernih frontend projekata. **Brz, jednostavan, preporučen.**

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

**Struktura:**
- `index.html` - jedina HTML stranica
- `src/main.jsx` - entry point
- `src/App.jsx` - glavna komponenta
- `package.json` - dependencies i skripte

---

# JSX - šta je?

**JSX = JavaScript + HTML sintaksa**

```jsx
function App() {
  const ime = "Ana";
  return (
    <div>
      <h1>Zdravo, {ime}!</h1>
    </div>
  );
}
```

- **Nije HTML** - prevodi se u JS pozive
- Dozvoljava pisanje "HTML-a" unutar JS-a
- `{...}` unutar JSX-a = bilo koji JS izraz

---

# JSX vs HTML

<div class="text-sm">

| HTML | JSX |
|------|-----|
| `class="card"` | `className="card"` |
| `for="email"` | `htmlFor="email"` |
| `onclick="..."` | `onClick={...}` |
| `<br>` | `<br />` (samozatvoren) |
| više root elemenata OK | **jedan** root (ili fragment `<>...</>`) |
| atributi su stringovi | JS izrazi u `{...}` |

</div>

```jsx
<input className="input" onChange={handleChange} />
```

---

# Komponenta = funkcija

Komponenta u React-u je obična **JavaScript funkcija** koja vraća JSX.

```jsx
function Pozdrav() {
  return <h1>Zdravo, svijete!</h1>;
}

export default Pozdrav;
```

**Pravila:**
- Ime komponente **mora počinjati velikim slovom**
- Vraća **jedan** JSX element
- Koristi se kao HTML tag: `<Pozdrav />`
- Svaka komponenta u svom fajlu (`.jsx`)

---

# Props - prosljeđivanje podataka

**Props** = "properties" - podaci koji idu iz **roditelja u dijete**.

```jsx
// dijete
function StudentCard({ ime, godine }) {
  return (
    <div>
      <h2>{ime}</h2>
      <p>{godine} godina</p>
    </div>
  );
}

// roditelj
function App() {
  return <StudentCard ime="Ana" godine={20} />;
}
```

---

# Props - pravila

- **Read-only** - dijete **ne smije** mijenjati props
- Stringovi idu u `""`, ostalo u `{}`:
  ```jsx
  <Card ime="Ana" godine={20} aktivan={true} />
  ```
- **Destructuring** u potpisu funkcije je preporučen stil:
  ```jsx
  function Card({ ime, godine }) { ... }
  ```
- Data flow je **jednosmjeran** - samo odozgo nadolje

<div class="mt-4 text-sm opacity-70">
Props su nepromjenljivi. Za mijenjanje ćemo koristiti "state" - to je v9.
</div>

---

# Kompozicija komponenti

Roditelj može renderovati **više djece**:

```jsx
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
```

Komponente se **spajaju** i grade složene UI-e iz jednostavnih dijelova.

---
layout: section
---

# Mini zadatak

---

# Zadatak - Knjižara

Napraviti aplikaciju koja prikazuje listu knjiga.

**Zahtjevi:**
1. Komponenta `BookCard` sa props: `naslov`, `autor`, `godinaIzdanja`, `cijena`
2. U `App.jsx` prikazati **najmanje 4 knjige**
3. Zaglavlje "Dobrodošli u knjižaru"
4. Stilizovati kartice (border, padding, margin)

**Bonus:**
- Komponenta `Header` za naslov stranice
- Komponenta `Footer` sa kontaktom

---

# Šta treba znati na kraju v8

- [x] Šta je React i zašto se koristi
- [x] Razlika SPA vs MPA
- [x] Moderni JS: arrow, destructuring, spread, map/filter
- [x] Setup Vite projekta
- [x] JSX - šta je i razlike od HTML-a
- [x] Kreiranje komponente
- [x] Props - prosljeđivanje i destructuring
- [x] Odnos roditelj - dijete

<div class="mt-8 text-center text-sm opacity-70">
U v9 dodajemo interaktivnost: state, hookovi, forme, fetch.
</div>

---
layout: center
class: text-center
---

# Hvala!

Pitanja?

<div class="mt-8 text-sm opacity-70">
Nastavljamo s Vite setupom uživo.
</div>
