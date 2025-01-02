import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

export const useAuth = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const login = async () => {
    await loginWithRedirect();
  };

  const logoutUser = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const getToken = useCallback(async (): Promise<string> => {
    const token = await getAccessTokenSilently();

    return token;
  }, [getAccessTokenSilently]);

  const resetPassword = async () => {
    await loginWithRedirect({
      authorizationParams: {
        prompt: "login",
        screen_hint: "reset-password",
      },
    });
  };

  const signUp = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return {
    login,
    logoutUser,
    user,
    isAuthenticated,
    isLoading,
    getToken,
    resetPassword,
    signUp,
  };
};
