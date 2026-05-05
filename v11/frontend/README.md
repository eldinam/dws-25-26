# V11 - Full Stack: Frontend ↔ Backend

Prvi pravi spoj frontenda i backenda. Frontend (Next.js) komunicira sa
postojećim FastAPI backendom kroz JWT auth.

## Struktura

```
v11/
├── backend/        # kopija iz v7 - FastAPI sa auth
└── frontend/       # Next.js + TanStack Query
```

## Pokretanje

### 1. Backend (terminal 1)

```bash
cd v11/backend
# aktiviraj .venv ako koristis (iz root foldera projekta)
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend radi na `http://localhost:8000`.
Swagger UI: `http://localhost:8000/docs`.

**Napomena:** prvi put kad pokreneš, kreirat će se prazna `database.db` u `v11/`.
Trebaš registrovati prvog korisnika (preko frontenda ili Swagger UI-a).

### 2. Frontend (terminal 2)

```bash
cd v11/frontend
npm install
npm run dev
```

Frontend radi na `http://localhost:3000`.

## Tok korištenja

1. Otvori `http://localhost:3000`
2. **Registracija** → kreira korisnika u bazi
3. **Prijava** → backend vraća JWT token, frontend ga čuva u `localStorage`
4. **Studenti / Kursevi** → fetchuje sa Bearer tokenom
5. **Odjava** → briše token

## Šta novo u odnosu na v9/v10

| | v9 (Vite + React) | v10 (Next.js basics) | **v11** |
|---|---|---|---|
| Fetch | useEffect + fetch | useEffect + fetch | **useQuery** |
| State | useState | useState | useState + **Context** |
| Backend | JSONPlaceholder (javni) | JSONPlaceholder | **vlastiti FastAPI** |
| Auth | nije | nije | **JWT + Bearer** |
| Forme | useState | useState | useState + **useMutation** |

## Ključni koncepti

### TanStack Query - useQuery

Umjesto ručnog `useState + useEffect + loading + error`:

```jsx
const { data, isLoading, error } = useQuery({
  queryKey: ["students"],
  queryFn: () => apiGet("/students"),
});
```

Prednosti:
- Automatsko keširanje (drugi posjet = instant)
- Automatski retry na greški
- Background refetch (kad se vraćaš u tab)
- `queryKey` identifikuje query u kešu

### useMutation - za POST/PUT/DELETE

```jsx
const mutation = useMutation({
  mutationFn: () => apiPost("/auth/login", { ... }),
  onSuccess: (data) => { /* uradi nešto */ },
});

mutation.mutate(); // pokreni
mutation.isPending // bool
mutation.isError   // bool
mutation.error     // Error
```

### React Context (AuthContext)

Dijeljenje stanja kroz cijelu aplikaciju bez prosljeđivanja props-a kroz svaku komponentu:

```jsx
const { user, login, logout } = useAuth();
```

Token se čuva u `localStorage` (preživi reload) + u Context state-u (re-render).

### JWT auth flow

```
Login forma → POST /auth/login (form-data) → { access_token }
   ↓
   localStorage.setItem("token", access_token)
   ↓
Svaki sljedeći API poziv:
   fetch("...", { headers: { Authorization: `Bearer ${token}` } })
   ↓
Backend dekodira JWT, identifikuje user-a, dozvoljava pristup
```

### Form-data za login (FastAPI specifičnost)

```js
// LOGIN koristi form-data, ne JSON
const formData = new URLSearchParams();
formData.append("username", username);
formData.append("password", password);

fetch("/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: formData,
});
```

To je zato što FastAPI koristi `OAuth2PasswordRequestForm` koji zahtjeva form-data.
Registracija (i sve ostalo) je standardni JSON.

## Šta NIJE pokriveno u v11 (za naredne vježbe)

- **MUI** (Material UI) → v12
- **Grid layout, Drawer, naprednije UI komponente** → v12
- **CRUD operacije** (POST/PUT/DELETE iz UI-a) → v13
  - dodavanje/edit/brisanje studenata i kurseva
  - validacija formi
  - confirmation dialogs
- **Refetch nakon mutacije** (`queryClient.invalidateQueries`) → v13
- **Optimistic updates** → napredno, opciono
- **Server-side auth** (cookies + middleware) → napredno

## Česte greške

- **Pogrešan Content-Type za login** → mora biti `application/x-www-form-urlencoded`
- **Token ne stiže do backenda** → provjeri `Authorization: Bearer ${token}` header
- **CORS greška** → backend već dozvoljava `localhost:3000`, ali ako koristiš drugi port, dodaj ga u `main.py`
- **Token istekne** → backend vraća 401, frontend treba odjaviti korisnika (može se dodati u `apiGet`)
- **`useQuery` ne pokreće fetch** → provjeri `enabled` opciju ili da li `queryKey` pravilno mijenja vrijednost

## Mini zadaci za studente (domaća)

1. Dodati polje "potvrdi lozinku" na registraciju (validacija na frontu)
2. Dodati prikaz user-a sa /auth/me na zasebnoj stranici /profil
3. **Bonus:** dodati pretragu (filter) iznad tabele studenata (client-side)
