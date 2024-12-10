import { Handler } from "@netlify/functions";

export const handler: Handler = async (request: object) => {
  return {
    statusCode: 200,
  };
};
