import "./globals.css";
import Providers from "./providers.jsx";
import Navbar from "../components/Navbar.jsx";

// Root layout
// Server Component - ne smije imati useState ili event handlere.
// Sve interaktivno mora biti unutar <Providers> ili Client Componente.

export const metadata = {
  title: "V11 - Full Stack",
  description: "DWS 2025-2026 - frontend povezan sa backendom",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs">
      <body>
        <Providers>
          <Navbar />
          <div className="container">{children}</div>
          <footer>DWS 2025-2026 · Vježba 11 · Frontend ↔ Backend</footer>
        </Providers>
      </body>
    </html>
  );
}
