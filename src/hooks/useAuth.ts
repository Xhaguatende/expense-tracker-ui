import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { loadConfig } from "../utils/config";

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

  const hasClaim = (claim: string) => {
    return user?.[claim] === true;
  };

  const getClaim = (claim: string) => {
    return user?.[claim];
  };

  const hasVerifiedEmail = getClaim("email_verified") === true;

  const resendVerificationEmail = async () => {
    try {
      const config = await loadConfig();
      const baseUrl = config.authBaseUrl;
      const token = await getToken();

      const response = await fetch(`${baseUrl}/api/auth/resend-verification`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.sub }),
      });

      const data = await response.json();

      if (!data.success) {
        console.log("Failed to resend verification email.");
      }

      return data.success;
    } catch (error) {
      console.error(error);
      return false;
    }
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
    hasVerifiedEmail,
    hasClaim,
    resendVerificationEmail,
  };
};
