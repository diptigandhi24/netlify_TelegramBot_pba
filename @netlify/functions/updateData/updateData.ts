import { Handler } from "@netlify/functions";

export const handler: Handler = async (request: object) => {
  console.log("Update function is active");
  return {
    statusCode: 200,
  };
};
