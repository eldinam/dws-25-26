"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { getErrorMessage } from "../../../../utils/api.js";
import { useAuth } from "../../../../utils/AuthContext.jsx";
import StudentForm from "../../../../components/StudentForm.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function UrediStudentaPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login");
    else if (!isAdmin) router.push("/studenti");
  }, [user, isAdmin, loading, router]);

  const { data: student, isLoading, error } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => (await api.get(`/students/${id}`)).data,
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: (data) => api.put(`/students/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", id] });
      router.push(`/studenti/${id}`);
    },
  });

  if (loading || !user || !isAdmin) return <CircularProgress />;
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Greška: {getErrorMessage(error)}</Alert>;

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        Uredi studenta
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        PUT /students/{id}. Forma je popunjena trenutnim podacima.
      </Alert>

      <Paper sx={{ p: 3 }}>
        <StudentForm
          initial={student}
          onSubmit={(data) => mutation.mutate(data)}
          isPending={mutation.isPending}
          errorMessage={mutation.isError ? getErrorMessage(mutation.error) : null}
          submitLabel="Sačuvaj izmjene"
          onCancel={() => router.push(`/studenti/${id}`)}
        />
      </Paper>
    </Box>
  );
}
