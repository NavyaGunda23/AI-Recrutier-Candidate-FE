// graphClient.ts
import { PublicClientApplication } from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";

import { msalConfig, loginRequest } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

let isInitialized = false;
const ensureInitialized = async () => {
  if (!isInitialized) {
    await msalInstance.initialize();
    await msalInstance.handleRedirectPromise();
    isInitialized = true;
  }
};

export const getGraphClient = async (): Promise<Client> => {
  await ensureInitialized();

  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) throw new Error("No account found. Please log in first.");

  const tokenResponse = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: accounts[0],
  });

  return Client.init({
    authProvider: (done) => done(null, tokenResponse.accessToken),
  });
};
