import SystemProvider from "./provider";
import DisplayQuestionAnswerList from "./questionAnswerList";

function App() {
  return (
    <SystemProvider>
      <DisplayQuestionAnswerList />
    </SystemProvider>
  );
}

export default App;
