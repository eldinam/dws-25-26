"use client";

// StudentForm sa MUI komponentama.
// Glavne komponente:
//   TextField - input sa label-om, hint-om, error state-om
//   Stack     - flex layout (vertikalno ili horizontalno)
//   Button    - dugme sa variantama
//   Alert     - error/success poruka

import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function StudentForm({
  initial,
  onSubmit,
  isPending,
  errorMessage,
  submitLabel = "Sačuvaj",
  onCancel,
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [age, setAge] = useState(initial?.age?.toString() ?? "");
  const [nickname, setNickname] = useState(initial?.nickname ?? "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      age: Number(age),
      nickname: nickname.trim() || null,
    });
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <TextField
        label="Ime"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
        fullWidth
      />

      <TextField
        label="Godine"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        fullWidth
        inputProps={{ min: 1, max: 150 }}
      />

      <TextField
        label="Nadimak (opcionalno)"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
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
