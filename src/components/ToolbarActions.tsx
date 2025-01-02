import { useAuth } from "../hooks/useAuth";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";

export function ToolbarActions() {
  const { user, login, logoutUser, isAuthenticated } = useAuth();

  return (
    <Stack direction="row">
      {isAuthenticated ? (
        <div>
          <span className="username">{user?.name}</span>
          <Button color="inherit" onClick={logoutUser}>
            Logout
          </Button>
        </div>
      ) : (
        <Button color="inherit" onClick={login}>
          Login
        </Button>
      )}
      <ThemeSwitcher />
    </Stack>
  );
}
