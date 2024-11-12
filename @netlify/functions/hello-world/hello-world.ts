import { Handler } from "@netlify/functions";

export const handler: Handler = async (request, context) => {
  console.log("REceived a call with: ", request.body);
  return {
    statusCode: 200,
  };
};
