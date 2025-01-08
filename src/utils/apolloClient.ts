import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { loadConfig } from "../utils/config";

let apiUri = "";

const loadApiUri = async () => {
  const config = await loadConfig();
  apiUri = config.graphQLEndpoint;
};

await loadApiUri();

const httpLink = createHttpLink({
  uri: apiUri,
});

const createApolloClient = (getToken: () => Promise<string>) => {
  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
