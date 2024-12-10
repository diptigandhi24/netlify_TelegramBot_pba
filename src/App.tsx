import SystemProvider from "./provider";
import { useQuery, useStatus } from "@powersync/react";
import DisplayQuestionAnswerList from "./questionAnswerList";

function App() {
  return (
    <SystemProvider>
      <DisplayQuestionAnswerList />
    </SystemProvider>
  );
}

export default App;
