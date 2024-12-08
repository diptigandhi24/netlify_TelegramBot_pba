import { Handler } from "@netlify/functions";
import { Body, PostToDB } from "../../../netlifyUtility/messageTypes";
import {
  postToMongoDB,
  getResponsefromAi,
} from "../../../netlifyUtility/netlifyUtilityFunctions";

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
