import React, { useEffect, useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
import { useAuth } from "./hooks/useAuth";
import { createApolloClient } from "./utils/apolloClient";
import App from "./App";

interface AppWrapperProps {
  graphQLEndpoint: string;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ graphQLEndpoint }) => {
  const { getToken, isAuthenticated, isLoading } = useAuth();
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    const setupClient = async () => {
      if (!isLoading && isAuthenticated) {
        try {
          const clientInstance = createApolloClient(graphQLEndpoint, getToken);
          setClient(clientInstance);
        } catch (error) {
          console.error("Failed to setup Apollo client:", error);
        }
      }
    };

    setupClient();
  }, [getToken, graphQLEndpoint, isAuthenticated, isLoading]);

  // Show loading state while authentication is being checked
  if (isLoading) return <div>Checking authentication...</div>;

  // Show loading state while client is being set up
  if (isAuthenticated && !client)
    return <div>Setting up secure connection...</div>;

  // If not authenticated, still render the App (it will handle redirects via ProtectedRoute)
  if (!isAuthenticated) return <App />;

  // Render the authenticated app with Apollo provider
  return (
    <ApolloProvider client={client!}>
      <App />
    </ApolloProvider>
  );
};

export default AppWrapper;
