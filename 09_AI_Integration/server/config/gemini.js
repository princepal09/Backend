import { GoogleGenAI } from "@google/genai";
import { config } from "./config.js";

const ai = new GoogleGenAI({apiKey: config.GEMINI_API_KEY});

export async function gemini(content) {
  const response = await ai.models.generateContent({
    config : {
        systemInstruction : "Tell me answer in 1 word"
    },
    model: "gemini-3-flash-preview",
    contents: content,
  });
  

  return response.text.trim();
}
