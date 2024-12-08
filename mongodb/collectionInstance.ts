const { MongoClient } = require("mongodb");
import * as mongoDB from "mongodb";
import { QuestionAnswer } from "../netlifyUtility/messageTypes";
const mongoClient = new MongoClient(process.env.MONGODB_URI);

export async function getCollection(): Promise<
  mongoDB.Collection<QuestionAnswer>
> {
  try {
    const myDB = await mongoClient.db(process.env.DB_NAME);
    const myColl: mongoDB.Collection<QuestionAnswer> = myDB.collection(
      process.env.DB_COLLECTION
    );
    return myColl;
  } catch (e) {
    throw e;
  }
}
