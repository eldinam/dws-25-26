# V12 - Full CRUD + Material UI

Kompletna CRUD aplikacija nad postojećim FastAPI backendom + Material UI komponente.

## Pokretanje

### Backend
```bash
cd v12/backend
uvicorn main:app --reload
```
`http://localhost:8000` · Swagger: `/docs`

### Frontend
```bash
cd v12/frontend
npm install
npm run dev
```
`http://localhost:3000`

> Prvi `npm install` traje malo duže jer MUI ima dosta zavisnosti.

## Šta je novo u odnosu na v11

| | v11 | **v12** |
|---|---|---|
| HTTP klijent | fetch | **axios** + interceptori |
| Mutacije | login, register | **+ CRUD za sve entitete** |
| Cache | osnovni useQuery | **+ invalidateQueries** |
| Forme | inline | **+ reusable StudentForm, CourseForm, UserForm** |
| Routes | osnovni list | **+ /novi, /[id], /[id]/uredi** |
| Confirm dialog | nije bilo | **MUI Dialog** |
| UI biblioteka | custom CSS | **Material UI (MUI)** |
| Theming | / | **ThemeProvider + createTheme** |
| Ikonice | / | **@mui/icons-material** |

## MUI komponente koje koristimo

| Komponenta | Gdje | Za šta |
|---|---|---|
| `AppBar` + `Toolbar` | [Navbar](components/Navbar.jsx) | Gornja navigaciona traka |
| `Button` | svuda | Dugmad sa `variant`: contained, outlined, text |
| `IconButton` | tabele | Mala dugmad sa ikonicom |
| `TextField` | sve forme | Input + label + helperText + error state |
| `Stack` | forme, layouti | Flex layout (vertical/horizontal) |
| `Box` | svuda | Generički container sa `sx` propom |
| `Container` | layout.js | Max-width wrapper |
| `Typography` | naslovi, tekst | Konzistentna tipografija (h1, h2, body1...) |
| `Card` + `CardContent` | home, detalji | Kartice sa shadow-om |
| `Paper` | forme | Paneli, alternativa za Card |
| `Table` + family | sve liste | Strukturirane tabele |
| `Dialog` + family | ConfirmDialog | Modal sa overlay, focus trap |
| `Alert` | greške, info | Obavještenja sa boja-svrhom |
| `Chip` | role | Mali tag (admin, korisnik) |
| `CircularProgress` | loading | Spinner |
| `Tooltip` | ikonicama | Hover hint |
| `MenuItem` | CourseForm select | Stavke u dropdown |

## MUI Ikonice

`@mui/icons-material` — preko 2000 ikonica iz Google Material Design.

```jsx
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// ...
<IconButton><EditIcon /></IconButton>
```

## Theme

`utils/theme.js` definiše boje, tipografiju, oblik. Sve MUI komponente ga čitaju.

```jsx
const theme = createTheme({
  palette: {
    primary: { main: "#20232a" },
    secondary: { main: "#61dafb" },
  },
});
```

Mijenjaš jednu boju ovdje, svuda u aplikaciji se promijeni.

## sx prop

MUI ima poseban `sx` prop za inline stiling. Slično CSS-u ali sa pristupom theme-u:

```jsx
<Box sx={{
  p: 2,                      // padding (2 * 8px = 16px)
  mt: 3,                     // margin-top
  bgcolor: "primary.main",   // čita iz theme
  display: "flex",
  gap: 1,
}}>
```

## Pokrivene rute backenda

### Auth
- ✅ POST /auth/register
- ✅ POST /auth/login (form-data!)
- ✅ GET /auth/me (kroz AuthContext)

### Students
- ✅ GET /students, GET /students/{id}
- ✅ POST, PUT, DELETE /students
- ✅ GET /students/{id}/courses

### Courses
- ✅ GET /courses, GET /courses/{id}
- ✅ POST, PUT, DELETE /courses

### Users
- ✅ GET /users (admin), GET /users/{id}
- ✅ PUT, DELETE /users

## Struktura

```
v12/frontend/
├── app/
│   ├── layout.js              # html + body + Providers + Navbar + Container + footer
│   ├── providers.jsx          # QueryClient + Theme + CssBaseline + Auth
│   ├── globals.css            # minimalan, MUI radi većinu
│   ├── page.js                # /
│   ├── login/page.js
│   ├── register/page.js
│   ├── profil/page.js
│   ├── studenti/
│   │   ├── page.js              # lista
│   │   ├── novi/page.js         # create
│   │   └── [id]/
│   │       ├── page.js          # detalji + kursevi
│   │       └── uredi/page.js    # edit
│   ├── kursevi/
│   │   ├── page.js, novi, [id]/page + uredi
│   └── korisnici/
│       ├── page.js              # admin lista
│       └── [id]/uredi/page.js
├── components/
│   ├── Navbar.jsx              # AppBar + Toolbar
│   ├── ConfirmDialog.jsx       # MUI Dialog
│   ├── StudentForm.jsx         # MUI TextField + Stack
│   ├── CourseForm.jsx          # + TextField select + MenuItem
│   └── UserForm.jsx
└── utils/
    ├── api.js                  # axios + interceptori
    ├── AuthContext.jsx
    └── theme.js                # MUI createTheme
```

## Plan časa (90 min) — kako da pređeš s njima

1. **Pokretanje + pregled** (5 min) — vidi da sve radi
2. **axios + interceptori** (10 min) — utils/api.js
3. **MUI setup** (10 min) — providers.jsx, theme.js, ThemeProvider, CssBaseline
4. **AppBar / Toolbar / Button** (10 min) — Navbar
5. **TextField + Stack + Alert** (10 min) — StudentForm
6. **Table family** (15 min) — studenti/page.js + IconButton + Tooltip
7. **Dialog** (5 min) — ConfirmDialog
8. **useMutation + invalidateQueries** (15 min) — POST/DELETE primjeri
9. **sx prop + Box + Typography** (5 min) — quick MUI tour
10. **Pitanja** (5 min)

## Kako napraviti admin korisnika

Backend nema endpoint za to. Ručno u bazi:

```bash
sqlite3 dws-25-26/database.db
UPDATE user SET is_admin = 1 WHERE username = 'tvoj_username';
.quit
```

Ili kroz DBeaver / TablePlus / Azure Data Studio. Nakon, odjavi se i ponovo prijavi.

## Šta NIJE pokriveno (eventualno za buduće vježbe)

- **MUI X DataGrid** — napredniji table sa pagination/sort/filter ugrađenim
- **Snackbar** za toast notifikacije nakon akcije
- **Dark mode** toggle
- **Forme sa Formik / react-hook-form** — sad koristimo plain useState
- **Yup / zod validacija** — sad samo HTML required
- **Pagination** — sve se učitava odjednom
- **Optimistic updates** — tabela čeka response
- **Refresh tokeni**
