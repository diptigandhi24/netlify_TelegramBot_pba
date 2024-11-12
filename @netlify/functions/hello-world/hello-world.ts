import { Handler } from "@netlify/functions";

export const handler: Handler = async (request) => {
  console.log("Recieved request", request);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, from Dipti!`,
    }),
  };
};
