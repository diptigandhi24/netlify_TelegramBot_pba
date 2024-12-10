import { useQuery, useStatus, usePowerSync } from "@powersync/react";
import { useState } from "react";
interface QuestionAnswerType {
  id: string;
  question: string;
  aiAnswer: string;
}
function QuestionAnswerComponent({
  id,
  question,
  aiAnswer,
}: QuestionAnswerType) {
  let [isEdit, updateEdit] = useState(false);
  let [editableAiAnswer, updateAiAnswer] = useState(aiAnswer);
  let [isSave, updateSave] = useState(false);
  const powerSync = usePowerSync();

  function handleEdit(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    updateAiAnswer(() => e.target.value);
  }

  async function saveToPowersync() {
    console.log("Aianswer: ", editableAiAnswer);
    console.log("id: ", id);
    await powerSync.execute(
      `UPDATE parents_questions SET aiAnswer='${editableAiAnswer}' WHERE id=?`,
      [id]
    );
  }

  function editTrue() {
    updateEdit(true);
    updateSave(true);
  }
  return (
    <div>
      <p>
        <b>Id:</b> {id}
      </p>
      <p>
        <b>Question:</b> {question}
      </p>
      {!isEdit ? (
        <p>
          <b>Answer:</b> {aiAnswer}
        </p>
      ) : (
        <textarea
          style={{ height: "250px", width: "90%", padding: "20px" }}
          value={editableAiAnswer}
          onChange={handleEdit}
        />
      )}
      <div>
        <button onClick={editTrue}>Edit</button>
        {isSave ? <button onClick={saveToPowersync}>save</button> : null}
      </div>

      <hr />
    </div>
  );
}
export default function DisplayQuestionAnswerList() {
  const status = useStatus();
  const list: Array<QuestionAnswerType> = useQuery(
    "SELECT * FROM parents_questions"
  ).data;

  if (status.hasSynced && list.length !== 0) {
    return (
      <>
        {list.map((item: QuestionAnswerType) => {
          return (
            <QuestionAnswerComponent
              id={item.id}
              question={item.question}
              aiAnswer={item.aiAnswer}
            />
          );
        })}
      </>
    );
  } else {
    return <p>Loading</p>;
  }
}
