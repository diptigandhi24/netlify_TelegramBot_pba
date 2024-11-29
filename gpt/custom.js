import { configDotenv } from "dotenv";
configDotenv.apply()

import OpenAI from "openai";
const openai = new OpenAI();

async function getResponse(message) {
const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a neurodiversity affirming assistant who wants to help parents better understand their kids." },
        {
            role: "user",
            content: message,
        },
    ],
});

return completion.choices[0].message
}
export { getResponse }
