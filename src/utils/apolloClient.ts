import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

export const createApolloClient = (
  endpoint: string,
  getToken: () => Promise<string>
) => {
  const httpLink = new HttpLink({
    uri: endpoint,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await getToken();

      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    } catch (error) {
      console.error("Error fetching token:", error);
      return { headers };
    }
  });

  // Error handling link for debugging
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
