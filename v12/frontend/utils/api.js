// utils/api.js
//
// AXIOS instance + interceptori.
//
// Razlika u odnosu na v11:
//   - v11 koristio fetch (native browser API)
//   - v12 koristi AXIOS - moćnija biblioteka:
//       * automatski parsira JSON
//       * baca grešku na non-2xx statusima
//       * interceptori za request i response (cross-cutting concerns)
//       * konzistentnija sintaksa
//
// Interceptori = funkcije koje se izvrše PRIJE svakog requesta i NAKON svakog response-a.
// Koristimo ih da:
//   1) automatski dodamo Bearer token na svaki zahtjev (request interceptor)
//   2) automatski obradimo 401 (logout) na svakom response-u (response interceptor)

import axios from "axios";

export const API_URL = "http://localhost:8000";

// Kreiramo INSTANCU axiosa sa default opcijama.
// Možemo koristiti ovu instancu svuda umjesto pisanja URL-a svaki put.
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// REQUEST INTERCEPTOR
// Pokreće se PRIJE svakog requesta.
// Ovdje čitamo token iz localStorage i dodajemo Authorization header.
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
// Pokreće se NAKON svakog response-a.
// Ako backend vrati 401 (token istekao / nevažeći), brišemo token i šaljemo
// korisnika na login. Komponenta koja je pozvala request će također dobiti grešku.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const isLoginRequest = error.config?.url?.includes("/auth/login");
      // ne brišemo token ako je 401 došao od samog login zahtjeva
      // (tada je 401 = "pogrešne kredencijale", a ne "token istekao")
      if (!isLoginRequest) {
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// LOGIN je poseban - FastAPI OAuth2 traži form-data umjesto JSON-a
export async function loginRequest(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const res = await api.post("/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data; // { access_token, token_type }
}

// Helper za izvlačenje poruke greške iz axios error objekta
export function getErrorMessage(error) {
  return (
    error.response?.data?.detail ||
    error.message ||
    "Nepoznata greška"
  );
}

export default api;
