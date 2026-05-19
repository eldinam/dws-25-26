"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import api, { getErrorMessage } from "../../utils/api.js";
import { useAuth } from "../../utils/AuthContext.jsx";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function KorisniciPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) router.push("/login");
    else if (!isAdmin) router.push("/");
  }, [user, isAdmin, authLoading, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await api.get("/users")).data,
    enabled: !!user && isAdmin,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setToDelete(null);
    },
  });

  if (authLoading || !user || !isAdmin) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Korisnici (admin)
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        Lista svih korisnika sistema. Novi korisnici se kreiraju kroz /auth/register.
      </Alert>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Greška: {getErrorMessage(error)}</Alert>}

      {data && data.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Username</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Puno ime</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Uloga</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }} align="right">Akcije</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.full_name || "—"}</TableCell>
                  <TableCell>
                    {u.is_admin ? (
                      <Chip label="admin" color="error" size="small" />
                    ) : (
                      <Chip label="korisnik" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Uredi">
                      <IconButton
                        component={Link}
                        href={`/korisnici/${u.id}/uredi`}
                        size="small"
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {u.id !== user.id && (
                      <Tooltip title="Obriši">
                        <IconButton size="small" color="error" onClick={() => setToDelete(u)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {deleteMutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Greška: {getErrorMessage(deleteMutation.error)}
        </Alert>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Obriši korisnika"
        message={`Obrisati korisnika "${toDelete?.username}"?`}
        confirmLabel="Obriši"
        onConfirm={() => deleteMutation.mutate(toDelete.id)}
        onCancel={() => setToDelete(null)}
        isPending={deleteMutation.isPending}
      />
    </Box>
  );
}
