import { GoogleGenAI } from "@google/genai";
import { config } from "./config.js";


const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

export async function gemini(content) {
  const response = await ai.models.generateContent({
    config: {
      systemInstruction: "Tell me answer in 50 words"
    },
    model: "gemini-2.5-flash",
    contents: content
  });


  return response.text.trim();
}
