"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import api, { getErrorMessage } from "../../utils/api.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/register", {
        username,
        email,
        full_name: fullName || null,
        password,
      });
      return res.data;
    },
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
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
          Registracija
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
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Puno ime (opcionalno)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Lozinka"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            inputProps={{ minLength: 4 }}
          />

          {mutation.isError && (
            <Alert severity="error">{getErrorMessage(mutation.error)}</Alert>
          )}

          {success && (
            <Alert severity="success">
              Uspješno registrovan! Preusmjeravanje...
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            disabled={mutation.isPending || success}
            fullWidth
          >
            {mutation.isPending ? "Registracija..." : "Registruj se"}
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Već imaš nalog?{" "}
          <Link href="/login" style={{ color: "#0066cc" }}>
            Prijavi se
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
