import { Handler } from "@netlify/functions";

export const handler: Handler = async (request) => {
  return {
    statusCode: 200,
  };
};
