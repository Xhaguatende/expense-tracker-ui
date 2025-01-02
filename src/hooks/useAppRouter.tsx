import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Router } from "@toolpad/core/AppProvider";

export function useAppRouter(): Router {
  const navigate = useNavigate();
  const location = useLocation();

  return React.useMemo(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path: string | URL) => navigate(path),
    }),
    [location, navigate]
  );
}
