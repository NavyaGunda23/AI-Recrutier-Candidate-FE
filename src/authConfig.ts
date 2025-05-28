// src/authConfig.ts
export const msalConfig = {
    auth: {
      clientId: "c5f0dbeb-4699-441a-87e8-35f57221e20a",
      authority: "https://login.microsoftonline.com/4dd61b03-98c5-4fb5-a9ed-a235057fb976",
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true,
    }
  };
  
  export const loginRequest = {
    scopes: ["User.Read", "Files.ReadWrite.All"],
    prompt: "none", // <- important for silent login
  };
  