import { UpdateType } from "@powersync/web";

export class Connector {
  async fetchCredentials() {
    // Implement fetchCredentials to obtain a JWT from your authentication service.
    // See https://docs.powersync.com/installation/authentication-setup
    // If you're using Supabase or Firebase, you can re-use the JWT from those clients, see
    // - https://docs.powersync.com/installation/authentication-setup/supabase-auth
    // - https://docs.powersync.com/installation/authentication-setup/firebase-auth
    return {
      endpoint: "https://674e9639633e15e565a2db9d.powersync.journeyapps.com",
      // Use a development token (see Authentication Setup https://docs.powersync.com/installation/authentication-setup/development-tokens) to get up and running quickly
      token:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6InBvd2Vyc3luYy1kZXYtMzIyM2Q0ZTMifQ.eyJzdWIiOiI2NzRlOTYzOTYzM2UxNWU1NjVhMmRiOWQiLCJpYXQiOjE3MzMzODgyMzYsImlzcyI6Imh0dHBzOi8vcG93ZXJzeW5jLWFwaS5qb3VybmV5YXBwcy5jb20iLCJhdWQiOiJodHRwczovLzY3NGU5NjM5NjMzZTE1ZTU2NWEyZGI5ZC5wb3dlcnN5bmMuam91cm5leWFwcHMuY29tIiwiZXhwIjoxNzMzNDMxNDM2fQ.ENBxppdK_JKkaBrWx-VkwefGH0-pYomDc8CfJOFSBywIj2P4YQmYhIxGcc-Fj8tr9n5y8arAq3L2D1-nCMtjslEBFscqlqmNOpYcrSmuU1WtlSOJ6XaMnvnBC60AnjgLrC8TB76odp7qTlrD7G2cGk8n5OvFAb9d5QdRLCyuMi_XYpYRGF_2YWnHLWhRUk7kNJZap7XHh805DeXyzFHNC4FtVs5wApwizI9ZkoRZvvQpMubvrqvsx3XLA-uY_wpJG9PAiF5g87lrQ5TDWcUJAKVoMEPiyErKK7n3wQQjjHu7u7gRcx1S_xfjVMc1H1x_0_2VTTohcJYTevIQJG9g3w",
    };
  }

  async uploadData(database) {
    console.log("Trying to upload n");
    // Implement uploadData to send local changes to your backend service.
    // You can omit this method if you only want to sync data from the database to the client
    // See example implementation here: https://docs.powersync.com/client-sdk-references/javascript-web#3-integrate-with-your-backend
  }
}
