// TodoListDisplay.jsx
import { usePowerSync } from "@powersync/react";

export const TodoListDisplay = () => {
  const powersync = usePowerSync();

  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    powersync.getAll("SELECT * FROM parents_questions").then(setLists);
  }, []);

  return (
    <ul>
      {lists.map((list) => (
        <li key={list.id}>{list.name}</li>
      ))}
    </ul>
  );
};
