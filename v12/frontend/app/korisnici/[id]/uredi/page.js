"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { getErrorMessage } from "../../../../utils/api.js";
import { useAuth } from "../../../../utils/AuthContext.jsx";
import UserForm from "../../../../components/UserForm.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function UrediKorisnikaPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login");
    else if (!isAdmin) router.push("/");
  }, [user, isAdmin, loading, router]);

  const { data: korisnik, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => (await api.get(`/users/${id}`)).data,
    enabled: !!user && isAdmin,
  });

  const mutation = useMutation({
    mutationFn: (data) => api.put(`/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      router.push("/korisnici");
    },
  });

  if (loading || !user || !isAdmin) return <CircularProgress />;
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Greška: {getErrorMessage(error)}</Alert>;

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        Uredi korisnika
      </Typography>

      <Paper sx={{ p: 3 }}>
        <UserForm
          initial={korisnik}
          onSubmit={(data) => mutation.mutate(data)}
          isPending={mutation.isPending}
          errorMessage={mutation.isError ? getErrorMessage(mutation.error) : null}
          submitLabel="Sačuvaj izmjene"
          onCancel={() => router.push("/korisnici")}
        />
      </Paper>
    </Box>
  );
}
