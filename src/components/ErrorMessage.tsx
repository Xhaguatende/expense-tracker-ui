import Typography from "@mui/material/Typography";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Typography
      color="error"
      component="div"
      sx={{
        padding: 2,
        backgroundColor: "error.light",
        color: "error.main",
        borderRadius: 1,
        marginY: 1,
      }}
    >
      Error: {message}
    </Typography>
  );
};

export default ErrorMessage;
