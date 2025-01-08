import { useAuth } from "../../hooks/useAuth";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { showSnackbar } from "../../services/SnackbarService";

const Home = () => {
  const {
    isAuthenticated,
    hasVerifiedEmail,
    login,
    signUp,
    resendVerificationEmail,
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleResendVerification = async () => {
    setIsLoading(true);
    const success = await resendVerificationEmail();
    setIsLoading(false);

    showSnackbar({
      message: success
        ? "Verification email has been resent successfully!"
        : "Failed to resend verification email.",
      severity: success ? "success" : "error",
    });
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome to Expense Tracker
        </Typography>
        {!isAuthenticated && (
          <Typography variant="body1">
            Please
            <Button
              variant="contained"
              color="primary"
              onClick={login}
              sx={{ mx: 1 }}
            >
              Login
            </Button>
            or
            <Button
              variant="outlined"
              color="secondary"
              onClick={signUp}
              sx={{ mx: 1 }}
            >
              Sign-up
            </Button>
            to continue.
          </Typography>
        )}
        {isAuthenticated && !hasVerifiedEmail && (
          <Box mt={2}>
            <Typography variant="body1" gutterBottom>
              Please check your e-mail box for the verification link.
            </Typography>
            <Typography variant="body1">
              If you haven't received the e-mail, you can
              <Button
                variant="text"
                color="primary"
                onClick={handleResendVerification}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  "Resend Verification Link"
                )}
              </Button>
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
