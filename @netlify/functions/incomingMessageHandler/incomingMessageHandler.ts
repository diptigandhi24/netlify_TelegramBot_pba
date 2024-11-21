import { Handler } from "@netlify/functions";
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const myDB = mongoClient.db("pba");
const myColl = myDB.collection("parents_questions");

export interface Body {
  update_id: number;
  message: Message;
}

export interface Message {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text: string;
}

export interface Chat {
  id: number;
  title: string;
  type: string;
  all_members_are_administrators: boolean;
}

export interface From {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}
// make a mondo db call
async function postToDB(data: Body) {
  console.log("message we receive from Telegram", data.message.text);
}
export const handler: Handler = async (request: object) => {
  let postData: Body = JSON.parse(request.body);

  postToDB(postData);
  return {
    statusCode: 200,
  };
};
