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
        "eyJhbGciOiJSUzI1NiIsImtpZCI6InBvd2Vyc3luYy1kZXYtMzIyM2Q0ZTMifQ.eyJzdWIiOiI2NzRlOTYzOTYzM2UxNWU1NjVhMmRiOWQiLCJpYXQiOjE3MzM4ODcyMjYsImlzcyI6Imh0dHBzOi8vcG93ZXJzeW5jLWFwaS5qb3VybmV5YXBwcy5jb20iLCJhdWQiOiJodHRwczovLzY3NGU5NjM5NjMzZTE1ZTU2NWEyZGI5ZC5wb3dlcnN5bmMuam91cm5leWFwcHMuY29tIiwiZXhwIjoxNzMzOTMwNDI2fQ.mWiKDblhXyq5Lpct3OqIQvIXeoFMSWdYk1-HrOzbcm7i7InhIgnE8ZupJk-cRh4oQus1YkEkN_1hYo17bnpLGUwJ-lfuEQtPnMQJ5fCNW3WrRQVBRnwyCm3fWylXfDM0jvf7ta1nWRsc6SSNKRA7JvDBEzJJE1N_xNLb-BxTkQmYUV-iUXPMkf4IIKMqaHe76igVxHgRwJmRTZG2i7naskC1_mpSLYftOQ6CrwAlRCHZJsBGipG0u16V7_apgLYFMZKxzzdej6jnN6CCrfkOETxiNQ5zrP88yjFYAoaplDPqhr5PS3MZFUrhIoWkQ3sENP1sHMDMliLVWIcDwsoBvw",
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
        await transaction.complete();
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
