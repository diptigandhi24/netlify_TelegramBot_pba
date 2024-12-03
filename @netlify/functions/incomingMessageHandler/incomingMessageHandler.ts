import { Handler } from "@netlify/functions";
import { getResponse } from "../../../gpt/gemini";
import { Body, PostToDB, AiResponse } from "../../../messageTypes";
const { MongoClient } = require("mongodb");
import { getCollection } from "../../../collectionInstance";
import * as mongoDB from "mongodb";
import { QuestionAnswer } from "../../../messageTypes";

// make a mongo db call
async function postToMongoDB(data: PostToDB) {
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

async function getResponsefromAi(question: string): Promise<AiResponse> {
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
export const handler: Handler = async (request: object) => {
  let postData: Body = JSON.parse(request.body);
  let aiAnswer: { statusCode: number; response: string } =
    await getResponsefromAi(postData.message.text);
  if (aiAnswer.statusCode === 200) {
    let aiResponse: string = aiAnswer.response;
    let postToDB: PostToDB = { postData, aiResponse };
    await postToMongoDB(postToDB);
  }

  return {
    statusCode: 200,
  };
};
