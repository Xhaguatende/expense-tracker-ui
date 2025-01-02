import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./utils/apolloClient";
import { useAuth } from "./hooks/useAuth";
import App from "./App";

const AppWrapper = () => {
  const { getToken } = useAuth();
  const client = createApolloClient(getToken);

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default AppWrapper;
