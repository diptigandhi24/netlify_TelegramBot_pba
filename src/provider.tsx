import { AppSchema } from "../localSchema/AppSchema";
import { Connector as BackendConnector } from "../powersync/powerSyncConnector";
import { PowerSyncContext } from "@powersync/react";
import { PowerSyncDatabase } from "@powersync/web";
import Logger from "js-logger";
import React, { Suspense } from "react";

// eslint-disable-next-line react-hooks/rules-of-hooks
Logger.useDefaults();
Logger.setLevel(Logger.DEBUG);

const powerSync = new PowerSyncDatabase({
  database: { dbFilename: "powersync.db" },
  schema: AppSchema,
  flags: {
    disableSSRWarning: true,
  },
});
const connector = new BackendConnector();

powerSync.connect(connector);

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <PowerSyncContext.Provider value={powerSync}>
        {children}
      </PowerSyncContext.Provider>
    </Suspense>
  );
};

export default SystemProvider;
