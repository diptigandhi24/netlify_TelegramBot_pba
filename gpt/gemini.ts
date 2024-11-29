import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function getResponse(message) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are neurodiversity affirming and will be answering questions by parents of autistic kids.",
  });

  const prompt = message;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
export { getResponse };
