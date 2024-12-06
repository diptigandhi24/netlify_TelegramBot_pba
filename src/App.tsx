import { db as powerSync } from "../powerSyncInstance";
import { Connector } from "../powerSyncConnector";
import { usePowerSync } from "@powersync/react";
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
  await powerSync.connect(connector);
  console.log("POWERSYNC", powerSync.connected);
};
setupPowerSync();

// Get all list IDs
export const getLists = async () => {
  const results = await powerSync.getAll("SELECT * FROM parents_questions");
  console.log("results", results);
  return results;
};

const TodoListDisplay = () => {
  const powersync = usePowerSync();

  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    powersync.getAll("SELECT * FROM parents_questions").then(setLists);
    console.log("list isss", lists, powerSync);
  }, []);

  return (
    <ul>
      {lists.map((list) => (
        <li key={list.id}>{list.name}</li>
      ))}
    </ul>
  );
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
