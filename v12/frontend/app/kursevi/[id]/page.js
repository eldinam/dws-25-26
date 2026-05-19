"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import api, { getErrorMessage } from "../../../utils/api.js";
import { useAuth } from "../../../utils/AuthContext.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function DetaljiKursaPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  const { data: kurs, isLoading, error } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => (await api.get(`/courses/${id}`)).data,
    enabled: !!user,
  });

  if (authLoading || !user) return <CircularProgress />;
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Greška: {getErrorMessage(error)}</Alert>;
  if (!kurs) return <Alert severity="warning">Kurs nije pronađen.</Alert>;

  return (
    <Box>
      <Button
        component={Link}
        href="/kursevi"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Nazad na listu
      </Button>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h1">{kurs.title}</Typography>
        {isAdmin && (
          <Button
            component={Link}
            href={`/kursevi/${id}/uredi`}
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
          >
            Uredi
          </Button>
        )}
      </Stack>

      <Card>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow><TableCell><strong>ID</strong></TableCell><TableCell>{kurs.id}</TableCell></TableRow>
              <TableRow><TableCell><strong>Naziv</strong></TableCell><TableCell>{kurs.title}</TableCell></TableRow>
              <TableRow><TableCell><strong>Opis</strong></TableCell><TableCell>{kurs.description || "—"}</TableCell></TableRow>
              <TableRow>
                <TableCell><strong>Student</strong></TableCell>
                <TableCell>
                  {kurs.student ? (
                    <Link href={`/studenti/${kurs.student.id}`} style={{ color: "#0066cc" }}>
                      {kurs.student.name} (id: {kurs.student.id})
                    </Link>
                  ) : "—"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
