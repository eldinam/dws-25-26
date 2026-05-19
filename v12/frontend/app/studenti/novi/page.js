"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { getErrorMessage } from "../../../utils/api.js";
import { useAuth } from "../../../utils/AuthContext.jsx";
import StudentForm from "../../../components/StudentForm.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function NoviStudentPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login");
    else if (!isAdmin) router.push("/studenti");
  }, [user, isAdmin, loading, router]);

  const mutation = useMutation({
    mutationFn: (data) => api.post("/students", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      router.push("/studenti");
    },
  });

  if (loading || !user || !isAdmin) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        Novi student
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        POST /students. Nakon uspjeha, invalidateQueries osvježi listu.
      </Alert>

      <Paper sx={{ p: 3 }}>
        <StudentForm
          onSubmit={(data) => mutation.mutate(data)}
          isPending={mutation.isPending}
          errorMessage={mutation.isError ? getErrorMessage(mutation.error) : null}
          submitLabel="Kreiraj"
          onCancel={() => router.push("/studenti")}
        />
      </Paper>
    </Box>
  );
}
