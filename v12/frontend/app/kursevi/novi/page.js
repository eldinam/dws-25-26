"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { getErrorMessage } from "../../../utils/api.js";
import { useAuth } from "../../../utils/AuthContext.jsx";
import CourseForm from "../../../components/CourseForm.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

export default function NoviKursPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login");
    else if (!isAdmin) router.push("/kursevi");
  }, [user, isAdmin, loading, router]);

  const mutation = useMutation({
    mutationFn: (data) => api.post("/courses", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      router.push("/kursevi");
    },
  });

  if (loading || !user || !isAdmin) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        Novi kurs
      </Typography>

      <Paper sx={{ p: 3 }}>
        <CourseForm
          onSubmit={(data) => mutation.mutate(data)}
          isPending={mutation.isPending}
          errorMessage={mutation.isError ? getErrorMessage(mutation.error) : null}
          submitLabel="Kreiraj"
          onCancel={() => router.push("/kursevi")}
        />
      </Paper>
    </Box>
  );
}
