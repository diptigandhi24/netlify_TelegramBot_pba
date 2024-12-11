import { Handler } from "@netlify/functions";
import { UpdateRequestionBody } from "../../../netlifyUtility/messageTypes";
// import { UpdateTableValue } from "../../../netlifyUtility/netlifyUtilityFunctions";

const headers = {
  "Access-Control-Allow-Origin": "*", // Allow your development origin
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allow specific HTTP methods
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specific headers
  "Access-Control-Max-Age": "86400", // Cache preflight request for 24 hours
};
export const handler: Handler = async (request: object) => {
  let postData: UpdateRequestionBody = JSON.parse(request.body);
  console.log("Update function is active", request, request.data);
  // let result = await UpdateTableValue(postData);
  // console.log("result recieved after update to mongodb", result);
  return {
    statusCode: 200,
    headers,
  };
};
