import { getResponse } from "../gpt/gemini";
import { PostToDB, AiResponse, QuestionAnswer } from "./messageTypes";
import { getCollection } from "../mongodb/collectionInstance";
import * as mongoDB from "mongodb";

export async function postToMongoDB(data: PostToDB) {
  const question = data.postData.message.text;
  const aiAnswer = data.aiResponse;
  try {
    const myColl: mongoDB.Collection<QuestionAnswer> = await getCollection();
    const result = await myColl.insertOne({
      question: question,
      aiAnswer: aiAnswer,
    });
  } catch (e) {
    console.log(
      `A MongoBulkWriteException occurred, but there are successfully processed documents.`,
      e
    );
  } finally {
    console.log("Run complete");
  }
}

export async function getResponsefromAi(question: string): Promise<AiResponse> {
  try {
    let r = await getResponse(question);
    console.log(JSON.stringify(r));
    return {
      statusCode: 200,
      response: JSON.stringify(r),
    };
  } catch (e) {
    return {
      statusCode: 500,
      response: "Please try again in sometime",
    };
  }
}
