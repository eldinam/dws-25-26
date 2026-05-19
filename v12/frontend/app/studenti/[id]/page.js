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
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function DetaljiStudentaPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  const { data: student, isLoading, error } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => (await api.get(`/students/${id}`)).data,
    enabled: !!user,
  });

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["student", id, "courses"],
    queryFn: async () => (await api.get(`/students/${id}/courses`)).data,
    enabled: !!user,
  });

  if (authLoading || !user) {
    return <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}><CircularProgress /></Box>;
  }
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Greška: {getErrorMessage(error)}</Alert>;
  if (!student) return <Alert severity="warning">Student nije pronađen.</Alert>;

  return (
    <Box>
      <Button
        component={Link}
        href="/studenti"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Nazad na listu
      </Button>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h1">{student.name}</Typography>
        {isAdmin && (
          <Button
            component={Link}
            href={`/studenti/${id}/uredi`}
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
          >
            Uredi
          </Button>
        )}
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow><TableCell><strong>ID</strong></TableCell><TableCell>{student.id}</TableCell></TableRow>
              <TableRow><TableCell><strong>Ime</strong></TableCell><TableCell>{student.name}</TableCell></TableRow>
              <TableRow><TableCell><strong>Godine</strong></TableCell><TableCell>{student.age}</TableCell></TableRow>
              <TableRow><TableCell><strong>Nadimak</strong></TableCell><TableCell>{student.nickname || "—"}</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Typography variant="h2" sx={{ mb: 2 }}>
        Kursevi
      </Typography>

      {coursesLoading && <CircularProgress />}

      {courses && courses.length === 0 && (
        <Typography color="text.secondary">Student nema upisanih kurseva.</Typography>
      )}

      {courses && courses.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Naziv</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Opis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>
                    <Link href={`/kursevi/${c.id}`} style={{ color: "#0066cc" }}>
                      {c.title}
                    </Link>
                  </TableCell>
                  <TableCell>{c.description || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
