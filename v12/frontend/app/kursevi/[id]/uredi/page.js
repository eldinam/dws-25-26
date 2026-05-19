"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { getErrorMessage } from "../../../../utils/api.js";
import { useAuth } from "../../../../utils/AuthContext.jsx";
import CourseForm from "../../../../components/CourseForm.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function UrediKursPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login");
    else if (!isAdmin) router.push("/kursevi");
  }, [user, isAdmin, loading, router]);

  const { data: kurs, isLoading, error } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => (await api.get(`/courses/${id}`)).data,
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: (data) => api.put(`/courses/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", id] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      router.push(`/kursevi/${id}`);
    },
  });

  if (loading || !user || !isAdmin) return <CircularProgress />;
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Greška: {getErrorMessage(error)}</Alert>;

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        Uredi kurs
      </Typography>

      <Paper sx={{ p: 3 }}>
        <CourseForm
          initial={kurs}
          onSubmit={(data) => mutation.mutate(data)}
          isPending={mutation.isPending}
          errorMessage={mutation.isError ? getErrorMessage(mutation.error) : null}
          submitLabel="Sačuvaj izmjene"
          onCancel={() => router.push(`/kursevi/${id}`)}
        />
      </Paper>
    </Box>
  );
}
