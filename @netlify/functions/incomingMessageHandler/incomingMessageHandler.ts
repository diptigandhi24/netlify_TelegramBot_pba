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
  let temp = await JSON.parse(request.body);
  console.log("temp", typeof temp, temp.body.message);
  console.log("printing inside handler", request.body.update_id);

  postToDB(request.body);
  return {
    statusCode: 200,
  };
};
