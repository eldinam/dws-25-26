"use client";

// ConfirmDialog - sada koristi MUI Dialog komponentu.
// MUI Dialog automatski handluje:
//   - overlay (backdrop)
//   - focus trap (Tab ne izlazi iz dijaloga)
//   - ESC za zatvaranje
//   - centriranje, sjenke, animacije

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function ConfirmDialog({
  open,
  title = "Potvrdi akciju",
  message,
  confirmLabel = "Potvrdi",
  cancelLabel = "Odustani",
  onConfirm,
  onCancel,
  isPending = false,
  danger = true,
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isPending}>
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isPending}
          color={danger ? "error" : "primary"}
          variant="contained"
        >
          {isPending ? "..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
