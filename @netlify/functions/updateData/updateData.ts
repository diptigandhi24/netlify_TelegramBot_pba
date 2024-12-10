import { Handler } from "@netlify/functions";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
export const handler: Handler = async (request: object) => {
  console.log("Update function is active", request);
  return {
    statusCode: 200,
    headers,
  };
};
