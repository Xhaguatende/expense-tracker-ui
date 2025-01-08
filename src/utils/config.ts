type AppConfig = {
  Auth0: Auth0Config;
  graphQLEndpoint: string;
  authBaseUrl: string;
};

type Auth0Config = {
  Domain: string;
  ClientId: string;
  Audience: string;
};

let config: AppConfig = {
  Auth0: {
    Domain: "",
    ClientId: "",
    Audience: "",
  },
  graphQLEndpoint: "",
  authBaseUrl: "",
};

export const loadConfig = async (): Promise<AppConfig> => {
  console.log("Loading configuration...");

  const response = await fetch("/appSettings.json");

  if (!response.ok) {
    throw new Error("Failed to load configuration");
  }

  const loadedConfig = await response.json();

  config = { ...loadedConfig };

  return config;
};
