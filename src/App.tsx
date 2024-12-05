import React from "react";
// import { PowerSyncDatabase } from "@powersync/web";
// import { PowerSyncContext } from "@powersync/react";
// import { db } from "../powerSyncInstance";

function App() {
  // const [powerSync] = React.useState(db);
  // const [connected, setConnected] = React.useState(powersync.connected);

  // React.useEffect(() => {
  //   // Register listener for changes made to the powersync status
  //   return powerSync.registerListener({
  //     statusChanged: (status) => {
  //       setConnected(status.connected);
  //     },
  //   });
  // }, [powersync]);

  // return (
  //   // <PowerSyncContext.Provider value={powerSync}>
  //   //   <h1>Hello World ${}</h1>
  //   // </PowerSyncContext.Provider>

  // );
  return <h1>hello world</h1>;
}

export default App;
