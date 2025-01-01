interface Auth0Config {
  Domain: string;
  ClientId: string;
  Audience: string;
}

interface AppConfig {
  Auth0: Auth0Config;
  graphQLEndpoint: string;
}

// Default configuration to avoid null/undefined
let config: AppConfig = {
  Auth0: {
    Domain: "",
    ClientId: "",
    Audience: "",
  },
  graphQLEndpoint: "",
};

export const loadConfig = async (): Promise<AppConfig> => {
  console.log("Loading configuration");

  if (config.graphQLEndpoint) {
    // Cached config already loaded
    return config;
  }

  // Fetch config and override defaults
  const response = await fetch("/appSettings.json");
  if (!response.ok) {
    throw new Error("Failed to load configuration");
  }

  const loadedConfig = await response.json();
  config = { ...loadedConfig }; // Overwrite with fetched values
  return config;
};

export const getGraphQLEndpoint = (): string => {
  console.log("Getting GraphQL endpoint");

  return config.graphQLEndpoint; // Always valid, no nulls
};
