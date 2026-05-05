"use client";

// providers.jsx
// Omotač oko aplikacije koji postavlja:
//   - QueryClientProvider (TanStack Query)
//   - AuthProvider (naš context za auth)
//
// Mora biti Client Component jer koristi state i context.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "../lib/AuthContext.jsx";

export default function Providers({ children }) {
  // useState garantuje da se QueryClient kreira SAMO jednom po komponenti
  // (ne na svakom renderu)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30, // podaci su "fresh" 30 sekundi
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
