"use client";

// Lista studenata - sada koristi MUI X DataGrid umjesto obične Table.
//
// DataGrid u poređenju sa Table:
//   - automatska pagination
//   - automatsko sortiranje po kolonama (klik na header)
//   - automatsko filtriranje (toolbar)
//   - editing inline (opcionalno)
//   - column resizing
//   - virtualizacija (radi sa hiljadama redova)
//
// Cijena: dodatni paket @mui/x-data-grid (besplatna verzija = "MIT").
// Postoji i Pro/Premium verzija sa naprednim mogućnostima (paid).

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
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StudentiPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: async () => (await api.get("/students")).data,
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/students/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setToDelete(null);
    },
  });

  // Definicija kolona za DataGrid
  // field      - ime polja u rows objektu
  // headerName - tekst u headeru
  // flex       - relativna sirina (1 = jednako dijeli prostor)
  // renderCell - custom JSX za celiju
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "name",
      headerName: "Ime",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Link
          href={`/studenti/${params.row.id}`}
          style={{ color: "#0066cc", textDecoration: "none" }}
        >
          {params.value}
        </Link>
      ),
    },
    { field: "age", headerName: "Godine", width: 100, type: "number" },
    {
      field: "nickname",
      headerName: "Nadimak",
      flex: 1,
      minWidth: 120,
      valueGetter: (value) => value || "—",
    },
    {
      field: "courses",
      headerName: "Kurseva",
      width: 110,
      type: "number",
      valueGetter: (value) => value?.length || 0,
    },
    {
      field: "actions",
      headerName: "Akcije",
      width: 160,
      sortable: false,
      filterable: false,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Detalji">
            <IconButton component={Link} href={`/studenti/${params.row.id}`} size="small">
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {isAdmin && (
            <>
              <Tooltip title="Uredi">
                <IconButton
                  component={Link}
                  href={`/studenti/${params.row.id}/uredi`}
                  size="small"
                  color="primary"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Obriši">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setToDelete(params.row)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      ),
    },
  ];

  if (authLoading || !user) {
    return <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h1">Studenti</Typography>
        {isAdmin && (
          <Button
            component={Link}
            href="/studenti/novi"
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
          >
            Dodaj studenta
          </Button>
        )}
      </Stack>

      <Alert severity="info" sx={{ mb: 2 }}>
        Ova tabela koristi <strong>MUI X DataGrid</strong> — klik na header sortira,
        ikonice u toolbar-u filtriraju, paginacija je ugrađena.
      </Alert>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Greška: {getErrorMessage(error)}</Alert>}

      {data && (
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            loading={isLoading}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "primary.main",
                color: "white",
              },
              "& .MuiDataGrid-columnHeader": {
                bgcolor: "primary.main",
              },
              "& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIconButton, & .MuiDataGrid-filterIcon": {
                color: "white",
              },
            }}
          />
        </Paper>
      )}

      {deleteMutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Greška pri brisanju: {getErrorMessage(deleteMutation.error)}
        </Alert>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Obriši studenta"
        message={`Da li si sigurna da želiš obrisati studenta "${toDelete?.name}"?`}
        confirmLabel="Obriši"
        onConfirm={() => deleteMutation.mutate(toDelete.id)}
        onCancel={() => setToDelete(null)}
        isPending={deleteMutation.isPending}
      />
    </Box>
  );
}
