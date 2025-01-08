import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteExpenseDialogProps {
  expense: { id: string; title: string; date: string } | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const DeleteExpenseDialog: React.FC<DeleteExpenseDialogProps> = ({
  expense,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    if (expense) {
      onDelete(expense.id);
    }
    onClose();
  };

  return (
    <Dialog open={!!expense} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            Are you sure you want to delete the expense "{expense?.title}"
          </Typography>
          <Typography>Date: {expense?.date}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteExpenseButton: React.FC<{
  expense: { id: string; title: string; date: string };
  onDelete: (id: string) => void;
}> = ({ expense, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      {open && (
        <DeleteExpenseDialog
          expense={expense}
          onClose={() => setOpen(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default DeleteExpenseDialog;
