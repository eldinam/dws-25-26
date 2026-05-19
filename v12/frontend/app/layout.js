import "./globals.css";
import Providers from "./providers.jsx";
import Navbar from "../components/Navbar.jsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const metadata = {
  title: "V12 - Full CRUD + MUI",
  description: "DWS 2025-2026 - axios + CRUD + Material UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs">
      <body>
        <Providers>
          <Navbar />

          <Container maxWidth="lg" sx={{ py: 3 }}>
            {children}
          </Container>

          <Box
            component="footer"
            sx={{
              textAlign: "center",
              py: 3,
              mt: 5,
              borderTop: "1px solid",
              borderColor: "divider",
              color: "text.secondary",
            }}
          >
            <Typography variant="body2">
              DWS 2025-2026 · Vježba 12 · Full CRUD + Material UI
            </Typography>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
