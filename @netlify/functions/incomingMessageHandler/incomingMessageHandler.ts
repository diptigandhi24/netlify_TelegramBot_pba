import { Handler } from "@netlify/functions";
import { getResponse } from "../../../gpt/gemini";
import { Body, PostToDB, AiResponse } from "../../../messageTypes";
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

// make a mongo db call
async function postToMongoDB(data: PostToDB) {
  const question = data.message.text;
  try {
    const myDB = await mongoClient.db("pba");
    const myColl = myDB.collection("parents_questions");
    const result = await myColl.insertOne(question);
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
    let r = await getResponse(
      "Hi, I’m curious to know if, any of you have the preference to eat same food everyday? My son wants to eat same food every single time.. I wonder why don’t he get bored of it…"
    );
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
