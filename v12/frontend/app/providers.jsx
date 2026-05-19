"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { AuthProvider } from "../utils/AuthContext.jsx";
import theme from "../utils/theme.js";

// Providers
// Wrapuje cijelu aplikaciju sa:
//   - QueryClientProvider (TanStack Query - keš za API)
//   - ThemeProvider (MUI - boje, fontovi)
//   - CssBaseline (MUI - resetuje browser default stilove, kao normalize.css)
//   - AuthProvider (naš context za auth)

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 1000 * 30, retry: 1 },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
