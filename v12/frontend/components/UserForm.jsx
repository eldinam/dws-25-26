"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function UserForm({
  initial,
  onSubmit,
  isPending,
  errorMessage,
  submitLabel = "Sačuvaj",
  onCancel,
}) {
  const [username, setUsername] = useState(initial?.username ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [fullName, setFullName] = useState(initial?.full_name ?? "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      username: username.trim(),
      email: email.trim(),
      full_name: fullName.trim() || null,
    });
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
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

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Stack direction="row" spacing={1}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={isPending}
        >
          {isPending ? "Spremanje..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={isPending}
          >
            Odustani
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
