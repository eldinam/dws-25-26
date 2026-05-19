"use client";

// CourseForm sa MUI - TextField + Select (za studenta).
// MUI Select je malo poseban - koristi MenuItem djecu.

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api.js";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";

export default function CourseForm({
  initial,
  onSubmit,
  isPending,
  errorMessage,
  submitLabel = "Sačuvaj",
  onCancel,
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [studentId, setStudentId] = useState(
    initial?.student_id?.toString() ?? ""
  );

  const { data: studenti, isLoading: studentiLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => (await api.get("/students")).data,
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      student_id: Number(studentId),
    });
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <TextField
        label="Naziv kursa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        autoFocus
        fullWidth
      />

      <TextField
        label="Opis (opcionalno)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        fullWidth
      />

      <TextField
        label="Student"
        select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        required
        fullWidth
        helperText={studentiLoading ? "Učitavanje studenata..." : ""}
      >
        <MenuItem value="">
          <em>-- odaberi studenta --</em>
        </MenuItem>
        {studenti?.map((s) => (
          <MenuItem key={s.id} value={s.id}>
            {s.name} (id: {s.id})
          </MenuItem>
        ))}
      </TextField>

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
