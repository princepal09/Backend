import {Ollama} from '@langchain/community/llms/ollama'

export const llm = new Ollama({
    model: 'phi3:mini',
})