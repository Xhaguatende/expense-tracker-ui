import { CircularProgress, Box } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
