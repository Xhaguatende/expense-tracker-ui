import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import SnackbarAlert from "./../components/SnackbarAlert";

type SnackbarOptions = {
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  duration?: number;
};

class SnackbarService {
  private static container: HTMLDivElement | null = null;
  private static root: ReturnType<typeof createRoot> | null = null;

  private static initialize() {
    if (!this.container) {
      this.container = document.createElement("div");
      document.body.appendChild(this.container);
      this.root = createRoot(this.container);
    }
  }

  private static SnackbarComponent = ({
    options,
    onClose,
  }: {
    options: SnackbarOptions;
    onClose: () => void;
  }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
      setOpen(true);
    }, [options]);

    const handleClose = () => {
      setOpen(false);
      onClose();
    };

    return (
      <SnackbarAlert
        open={open}
        message={options.message}
        severity={options.severity || "info"}
        duration={options.duration}
        onClose={handleClose}
      />
    );
  };

  static show = (options: SnackbarOptions) => {
    this.initialize();
    const handleClose = () => {
      this.root?.render(<></>);
    };

    this.root?.render(
      <this.SnackbarComponent options={options} onClose={handleClose} />
    );
  };
}

export const showSnackbar = SnackbarService.show;
