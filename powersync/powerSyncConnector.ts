import { AbstractPowerSyncDatabase } from "@powersync/web";

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
        "eyJhbGciOiJSUzI1NiIsImtpZCI6InBvd2Vyc3luYy1kZXYtMzIyM2Q0ZTMifQ.eyJzdWIiOiI2NzRlOTYzOTYzM2UxNWU1NjVhMmRiOWQiLCJpYXQiOjE3MzM4MDgwNTIsImlzcyI6Imh0dHBzOi8vcG93ZXJzeW5jLWFwaS5qb3VybmV5YXBwcy5jb20iLCJhdWQiOiJodHRwczovLzY3NGU5NjM5NjMzZTE1ZTU2NWEyZGI5ZC5wb3dlcnN5bmMuam91cm5leWFwcHMuY29tIiwiZXhwIjoxNzMzODUxMjUyfQ.FF5uwHgxN4s3QXUVNxoEdYeGkln-oh8QU44bnwz7Bq1JXJcWRn2Jtl4jQQGizHtDYJ30He7OIuLdCchTSJMUXvvqQZEDc1O1Yj-nM9HWsB645tlAaP6VoPPJywIyVxjv6L3KF9Eius6z8REtSkaVDvV968FWV519wDoRaEZ2KyFnwqGsyVH2LlbiM59nnRqfNWD9M3HP-hBmltowNF9U2chg4I8JuVMRO9jnxVx2ZbED9Iq-hOgRgRd744Zf5-bWPHD510FRQ-9Oz8S19sAagJw96VnYn-1X7YuK8sKAc7MpSh0NlyBAk1IHo5-R1fi12TjU5bfoxkF1uX_XSZnBsg",
    };
  }

  async uploadData(database: AbstractPowerSyncDatabase) {
    const transaction = await database.getNextCrudTransaction();
    if (!transaction) {
      return;
    }
    console.log("Trying to upload n");
    try {
      let batch: any[] = [];
      for (let operation of transaction.crud) {
        let payload = {
          op: operation.op,
          table: operation.table,
          id: operation.id,
          data: operation.opData,
        };
        batch.push(payload);
        const response = await fetch(
          `https://telegrambot-pba.netlify.app/.netlify/functions/updateData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ batch }),
          }
        );
        if (!response.ok) {
          throw new Error(
            `Received ${
              response.status
            } from /api/data: ${await response.text()}`
          );
        }
      }
    } catch (ex: any) {
      console.debug(ex);
      throw ex;
    }
    // Implement uploadData to send local changes to your backend service.
    // You can omit this method if you only want to sync data from the database to the client
    // See example implementation here: https://docs.powersync.com/client-sdk-references/javascript-web#3-integrate-with-your-backend
  }
}
