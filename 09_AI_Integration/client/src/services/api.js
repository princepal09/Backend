
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const END_POINTS = {
    GEMINI_AI_API: BASE_URL + '/api/v1/ai'
}

console.log(END_POINTS.GEMINI_AI_API)