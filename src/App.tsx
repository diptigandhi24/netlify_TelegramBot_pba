import { db as powerSync } from "../powerSyncInstance";
import { Connector } from "../powerSyncConnector";
import { usePowerSync } from "@powersync/react";
import { PowerSyncContext } from "@powersync/react";
import { Suspense } from "react";
const connector = new Connector();
powerSync.connect(connector);
function App() {
  console.log("PowerSync", powerSync);
  return (
    <Suspense fallback={<h4>Loading....</h4>}>
      <PowerSyncContext.Provider value={powerSync}>
        <h1>hello World</h1>
      </PowerSyncContext.Provider>
    </Suspense>
  );
}

export default App;
