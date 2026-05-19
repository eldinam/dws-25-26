"use client";

// utils/theme.js
// MUI theme - centralizovano definisanje boja, tipografije, oblika.
//
// MUI komponente automatski koriste theme - nigdje ne pišeš boju ručno.
// Ako sutra želiš drugi look, mijenjaš samo ovaj fajl.

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#20232a", contrastText: "#ffffff" }, // React dark
    secondary: { main: "#61dafb", contrastText: "#20232a" }, // React cyan
    error: { main: "#dc3545" },
    success: { main: "#198754" },
    warning: { main: "#ffb300" },
    background: {
      default: "#f7f9fc",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    h3: { fontSize: "1.2rem", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 }, // bez UPPERCASE
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiPaper: {
      defaultProps: { elevation: 1 },
    },
  },
});

export default theme;
