import React from "react";
import { Snackbar, Alert } from "@mui/material";

type SnackbarAlertProps = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose: () => void;
};

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  message,
  severity,
  onClose,
  duration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
