# V9 - Frontend primjeri

Demo projekat koji prati vježbu 9. Svaka sekcija u aplikaciji pokazuje jedan koncept.

## Pokretanje

```bash
cd v9/frontend
npm install
npm run dev
```

Otvori `http://localhost:5173` u browseru.

## Struktura

```
src/
├── main.jsx
├── App.jsx                    # glavna stranica sa sekcijama
├── index.css                  # globalni stilovi
└── components/
    ├── Brojac.jsx             # useState sa brojem
    ├── Toggle.jsx             # useState sa boolean + &&
    ├── UnosImena.jsx          # controlled input
    ├── PretragaStudenata.jsx  # filter + map + conditional
    ├── PromjenaNaslova.jsx    # useEffect sa zavisnošću
    ├── Korisnici.jsx          # fetch + loading/error/success
    ├── BookCard.jsx           # BookCard iz v8 + Like dugme (useState)
    └── Knjizara.jsx           # sve zajedno: state lista, pretraga, forma
```

## Redoslijed izvođenja na času

Idi redom kroz sekcije u `App.jsx`:

1. **Brojač** - upoznavanje sa useState
2. **Toggle** - boolean state + conditional rendering
3. **Controlled input** - kako je input vezan za state
4. **Pretraga** - kombinovanje svega
5. **useEffect** - side effects (promjena title-a)
6. **Fetch** - API poziv sa loading/error stanjima
7. **Knjižara** - finalni primjer koji spaja sve

Između sekcija stani i pitaj studente šta se dešava.

## Česte greške koje će studenti napraviti

- **Zaboravljen key prop** kod map - pokaži warning u konzoli
- **Direktna promjena state-a** (`knjige.push(...)` umjesto `setKnjige([...knjige, nova])`)
- **Nedostatak preventDefault** u formi - stranica se refreshuje
- **useEffect bez dep array-a** - beskonačna petlja ako se u njemu poziva setState
- **Async funkcija kao useEffect callback** - useEffect mora vratiti cleanup ili undefined, ne Promise

## Dalji koraci (domaća)

- Dodati dugme za brisanje knjige (filter + setKnjige)
- Dodati sortiranje (state za kriterij, sort)
- Prikazati broj ukupnih lajkova (lift state up - izazov!)
