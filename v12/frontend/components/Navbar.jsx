"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../utils/AuthContext.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LogoutIcon from "@mui/icons-material/Logout";

// Navbar koristi MUI komponente:
//   AppBar    - traka na vrhu stranice (sticky/fixed)
//   Toolbar   - flex kontejner unutar AppBara
//   Button    - dugme (variant: "text" izgleda kao link)
//   Chip      - mali tag (koristimo za "admin" oznaku)

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout, loading } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  // Helper - dugme koje vodi na rutu (sa highlight za aktivnu)
  function NavBtn({ href, children }) {
    const aktivan = pathname === href || pathname.startsWith(href + "/");
    return (
      <Button
        component={Link}
        href={href}
        color="inherit"
        sx={{
          fontWeight: aktivan ? 700 : 500,
          color: aktivan ? "secondary.main" : "white",
        }}
      >
        {children}
      </Button>
    );
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            color: "secondary.main",
            fontWeight: 700,
            mr: 2,
            textDecoration: "none",
          }}
        >
          DWS · v12
        </Typography>

        <NavBtn href="/">Početna</NavBtn>

        {user && <NavBtn href="/studenti">Studenti</NavBtn>}
        {user && <NavBtn href="/kursevi">Kursevi</NavBtn>}
        {isAdmin && <NavBtn href="/korisnici">Korisnici</NavBtn>}
        {user && <NavBtn href="/profil">Profil</NavBtn>}

        <Box sx={{ flexGrow: 1 }} />

        {loading ? (
          <Typography variant="body2">...</Typography>
        ) : user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "grey.400" }}>
              👤 {user.username}
            </Typography>
            {isAdmin && <Chip label="admin" color="error" size="small" />}
            <Button
              onClick={handleLogout}
              color="secondary"
              variant="contained"
              size="small"
              startIcon={<LogoutIcon />}
            >
              Odjava
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <NavBtn href="/login">Prijava</NavBtn>
            <NavBtn href="/register">Registracija</NavBtn>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
