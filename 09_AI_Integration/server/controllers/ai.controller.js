
// import { ApiError } from "@google/genai"
// import { gemini } from "../config/gemini.js"

// export const ai = async (req, res) => {
//     try {
//         const {prompt} = req.body
//         if (!prompt) {
//             throw new ApiError(400, 'All fields are required')
//         }
//         const response = await gemini(prompt);
//         console.log("RESPONSE",response)

//         return res.status(200).json({
//             success: true,
//             message : "Successfully fetched Data",
//             data : response
//         })

//     } catch (err) {
//         console.log("ERRRORRR!!!!!", err.message)
//         console.error(err.message);
//     }
// }