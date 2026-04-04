import { llm } from "../ai/ollama.js";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
// memory (GLOBAL)
const memory = new BufferMemory();

// chain (GLOBAL)
const chat = new ConversationChain({
    llm,
    memory,
});

// function
export const getChatResponse = async (message) => {
    const res = await chat.call({ input: `Answer in 10 word only: ${message}` });
    return res.response;
};