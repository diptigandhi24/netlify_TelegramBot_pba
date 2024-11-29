//import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
console.log(process.env.OPENAI_API_KEY);
//import { getResponse } from "./custom.js"
import { getResponse } from "./gemini.ts";
let r = await getResponse("Hi, I’m curious to know if, any of you have the preference to eat same food everyday? My son wants to eat same food every single time.. I wonder why don’t he get bored of it…")
console.log(JSON.stringify(r))
