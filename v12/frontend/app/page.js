"use client";

import Link from "next/link";
import { useAuth } from "../utils/AuthContext.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

// Home page koristi MUI Grid za responzivan layout kartica.
// Grid u MUI 6+ koristi size prop sa breakpoint objektom:
//   xs (extra small, <600px) - mobile
//   sm (small, ≥600px)       - tablet
//   md (medium, ≥900px)      - laptop
//   lg, xl                    - veci ekrani
// size 12 = puna sirina, size 6 = pola, size 4 = trecina

export default function Home() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}><CircularProgress /></Box>;
  }

  const akcije = [
    { href: "/studenti", label: "Studenti", icon: <SchoolIcon fontSize="large" />, color: "secondary" },
    { href: "/kursevi", label: "Kursevi", icon: <MenuBookIcon fontSize="large" />, color: "secondary" },
    isAdmin && { href: "/korisnici", label: "Korisnici", icon: <GroupIcon fontSize="large" />, color: "error" },
    { href: "/profil", label: "Profil", icon: <PersonIcon fontSize="large" />, color: "primary" },
  ].filter(Boolean);

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Dobrodošli u v12 — Full CRUD + MUI
      </Typography>

      <Alert severity="info" sx={{ my: 2 }}>
        Sve CRUD operacije nad backendom + Material UI komponente.
        Axios, useMutation, invalidateQueries, ThemeProvider, Grid — sve zajedno.
      </Alert>

      {user ? (
        <>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h2">Ulogovan kao {user.username}</Typography>
                {isAdmin && <Chip label="admin" color="error" />}
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Email: {user.email}
              </Typography>

              {!isAdmin && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  💡 Za dodavanje / editovanje / brisanje treba ti admin nalog.
                  Postavi <code>is_admin = 1</code> u bazi za tvog korisnika.
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* GRID layout za akcije - responzivno se prilagodi velicini ekrana */}
          <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>Brze akcije</Typography>
          <Grid container spacing={2}>
            {akcije.map((a) => (
              <Grid key={a.href} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{ height: "100%" }}>
                  <CardActionArea component={Link} href={a.href} sx={{ height: "100%", p: 2 }}>
                    <Stack alignItems="center" spacing={1}>
                      <Box sx={{ color: `${a.color}.main` }}>{a.icon}</Box>
                      <Typography variant="h3">{a.label}</Typography>
                    </Stack>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h2">Nisi ulogovan</Typography>
            <Typography sx={{ mt: 1 }}>Prijavi se ili registruj da bi pristupila aplikaciji.</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button component={Link} href="/login" variant="contained" color="secondary">Prijava</Button>
              <Button component={Link} href="/register" variant="outlined">Registracija</Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      <Typography variant="h2" sx={{ mt: 5, mb: 2 }}>
        Šta učimo u ovoj vježbi
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h3" gutterBottom>API i state</Typography>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                <li><strong>axios</strong> + interceptori</li>
                <li><strong>useMutation</strong> za POST/PUT/DELETE</li>
                <li><strong>invalidateQueries</strong> da se tabela osvježi</li>
                <li><strong>useQuery</strong> sa parametrima</li>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h3" gutterBottom>MUI</Typography>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                <li><strong>ThemeProvider</strong> + createTheme</li>
                <li><strong>AppBar, Button, TextField, Dialog</strong></li>
                <li><strong>Grid</strong> – responzivan layout</li>
                <li><strong>Icons</strong> iz @mui/icons-material</li>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
