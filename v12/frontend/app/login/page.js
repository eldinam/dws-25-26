"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { loginRequest, getErrorMessage } from "../../utils/api.js";
import { useAuth } from "../../utils/AuthContext.jsx";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: () => loginRequest(username, password),
    onSuccess: (data) => {
      login(data.access_token);
      router.push("/");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h1" gutterBottom>
          Prijava
        </Typography>

        <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            fullWidth
          />
          <TextField
            label="Lozinka"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          {mutation.isError && (
            <Alert severity="error">{getErrorMessage(mutation.error)}</Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            disabled={mutation.isPending}
            fullWidth
          >
            {mutation.isPending ? "Prijava u toku..." : "Prijavi se"}
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Nemaš nalog?{" "}
          <Link href="/register" style={{ color: "#0066cc" }}>
            Registruj se
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
