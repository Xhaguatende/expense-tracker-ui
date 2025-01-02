interface AppConfig {
  Auth0: Auth0Config;
  graphQLEndpoint: string;
}

interface Auth0Config {
  Domain: string;
  ClientId: string;
  Audience: string;
}

let config: AppConfig = {
  Auth0: {
    Domain: "",
    ClientId: "",
    Audience: "",
  },
  graphQLEndpoint: "",
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
