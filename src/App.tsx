import { db as powerSync } from "../powersync/powerSyncInstance";
import { PowerSyncDatabase } from "@powersync/web";
import { Connector } from "../powersync/powerSyncConnector";
import { PowerSyncContext } from "@powersync/react";
import React, { Suspense, useEffect } from "react";
// import { TodoListDisplay } from "./test.jsx";
import { AppSchema } from "../localSchema/AppSchema";
import SystemProvider from "./provider";
import { useQuery, useStatus } from "@powersync/react";

const connector = new Connector();
powerSync.connect(connector);

// Get all list IDs
export const getPbaQuestionsAnswers = async () => {
  const results = await powerSync.getAll("SELECT * FROM parents_questions");
  console.log("results", results);
  return results;
};
// getPbaQuestionsAnswers();
const Component = () => {
  const status = useStatus();
  const data = useQuery("SELECT * FROM parents_questions");

  if (status.hasSynced && data.data.length !== 0) {
    return (
      <div>
        {data.data.map((item, index) => (
          <p key={index}>{item.question}</p>
        ))}
      </div>
    );
  } else {
    return <h1>not Sync</h1>;
  }
};

function App() {
  return (
    <SystemProvider>
      <Component />
    </SystemProvider>
  );
}

export default App;
