import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import AppWrapper from "./AppWrapper";
import "./styles/index.css";
import { loadConfig } from "./utils/config";

const startApp = async () => {
  const config = await loadConfig(); // Load config only once before rendering.
  const auth0Config = config.Auth0;

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Auth0Provider
        domain={auth0Config.Domain}
        clientId={auth0Config.ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: auth0Config.Audience,
          scope:
            "openid profile email read:expenses write:expenses offline_access",
        }}
        cacheLocation="localstorage"
        useRefreshTokens={true}
        useRefreshTokensFallback={true}
        skipRedirectCallback={window.location.pathname === "/callback"}
      >
        <AppWrapper graphQLEndpoint={config.graphQLEndpoint} />
      </Auth0Provider>
    </React.StrictMode>
  );
};

startApp();
