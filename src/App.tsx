import { db as powerSync } from "../powerSyncInstance";
import { Connector } from "../powerSyncConnector";
import { PowerSyncContext } from "@powersync/react";
import React, { Suspense, useEffect } from "react";
// import { TodoListDisplay } from "./test.jsx";
import { useStatus } from "@powersync/react";

// const connector = new Connector();
// console.log("DataBase", powerSync.database);
// powerSync.connect(connector);
const setupPowerSync = async () => {
  // Uses the backend connector that will be created in the next section
  const connector = new Connector();
  powerSync.connect(connector).then(
    () => {
      console.log(`Complete ${powerSync.connected}`);
    },
    (reason) => console.log(reason)
  );
  console.log("POWERSYNC", powerSync.connected);
};
setupPowerSync();

// Get all list IDs
export const getPbaQuestionsAnswers = async () => {
  const results = await powerSync.getAll("SELECT * FROM parents_questions");
  console.log("results", results);
  return results;
};

const Component = () => {
  console.log("PowerSYnc", powerSync, powerSync.connected);
  const [connected, setConnected] = React.useState(powerSync.connected);
  React.useEffect(() => {
    // Register listener for changes made to the powersync status
    return powerSync.registerListener({
      statusChanged: (status) => {
        setConnected(status.connected);
      },
    });
  }, [powerSync]);

  return (
    <>
      <div> `${connected ? "Connected" : "Disconnected"}`</div>
    </>
  );
};

function App() {
  return (
    <PowerSyncContext.Provider value={powerSync}>
      <Component />
    </PowerSyncContext.Provider>
  );
}

export default App;
