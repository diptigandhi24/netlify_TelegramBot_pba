import { column, Schema, Table } from "@powersync/web";
// OR: import { column, Schema, Table } from '@powersync/react-native';

const parents_questions = new Table(
  {
    // id column (text) is automatically included
    question: column.text,
    aiAnswer: column.text,
  },
  { indexes: {} }
);

export const AppSchema = new Schema({
  parents_questions,
});

export type Database = (typeof AppSchema)["types"];
