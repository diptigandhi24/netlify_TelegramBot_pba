import { Handler } from "@netlify/functions";
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const myDB = mongoClient.db("pba");
const myColl = myDB.collection("parents_questions");

// make a mondo db call
async function postToDB(data) {
  console.log("message we receive from instagram", data);
}
export const handler: Handler = async (request) => {
  console.log("printing inside handler", request, request.body);
  postToDB(request);
  return {
    statusCode: 200,
  };
};
