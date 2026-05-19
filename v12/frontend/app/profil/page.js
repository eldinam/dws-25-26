"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../utils/AuthContext.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function ProfilPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Moj profil
      </Typography>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h2">{user.username}</Typography>

          <Table sx={{ mt: 2 }}>
            <TableBody>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell>{user.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Korisničko ime</strong></TableCell>
                <TableCell>{user.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Puno ime</strong></TableCell>
                <TableCell>{user.full_name || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Uloga</strong></TableCell>
                <TableCell>
                  {isAdmin ? (
                    <Chip label="admin" color="error" size="small" />
                  ) : (
                    <Chip label="korisnik" color="default" size="small" />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
            Endpoint: GET /auth/me
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
