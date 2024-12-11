import { Handler } from "@netlify/functions";
import { UpdateRequestionBody } from "../../../netlifyUtility/messageTypes";
import { UpdateTableValue } from "../../../netlifyUtility/netlifyUtilityFunctions";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
export const handler: Handler = async (request: object) => {
  let postData: UpdateRequestionBody = JSON.parse(request.body);
  console.log("Update function is active");
  let result = await UpdateTableValue(postData);
  console.log("result recieved after update to mongodb", result);
  return {
    statusCode: 200,
    headers,
  };
};
