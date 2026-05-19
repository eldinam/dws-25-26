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
import Button from "@mui/material/Button";
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
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function KurseviPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => (await api.get("/courses")).data,
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/courses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setToDelete(null);
    },
  });

  if (authLoading || !user) return <CircularProgress />;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h1">Kursevi</Typography>
        {isAdmin && (
          <Button
            component={Link}
            href="/kursevi/novi"
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
          >
            Dodaj kurs
          </Button>
        )}
      </Stack>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Greška: {getErrorMessage(error)}</Alert>}
      {data && data.length === 0 && <Typography>Nema kurseva.</Typography>}

      {data && data.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Naziv</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Opis</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Student</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }} align="right">Akcije</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>
                    <Link href={`/kursevi/${c.id}`} style={{ color: "#0066cc" }}>
                      {c.title}
                    </Link>
                  </TableCell>
                  <TableCell>{c.description || "—"}</TableCell>
                  <TableCell>
                    {c.student ? (
                      <Link href={`/studenti/${c.student.id}`} style={{ color: "#0066cc" }}>
                        {c.student.name}
                      </Link>
                    ) : "—"}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Detalji">
                      <IconButton component={Link} href={`/kursevi/${c.id}`} size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {isAdmin && (
                      <>
                        <Tooltip title="Uredi">
                          <IconButton component={Link} href={`/kursevi/${c.id}/uredi`} size="small" color="primary">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Obriši">
                          <IconButton size="small" color="error" onClick={() => setToDelete(c)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
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
        title="Obriši kurs"
        message={`Obrisati kurs "${toDelete?.title}"?`}
        confirmLabel="Obriši"
        onConfirm={() => deleteMutation.mutate(toDelete.id)}
        onCancel={() => setToDelete(null)}
        isPending={deleteMutation.isPending}
      />
    </Box>
  );
}
