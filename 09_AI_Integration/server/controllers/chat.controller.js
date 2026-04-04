import { getChatResponse } from "../services/chat.service.js";

export const chatController = async (req, res) => {
    try {

        const { message } = req.body
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message should be required"
            })
        }
        const response = await getChatResponse(message);
        console.log("MODEL RESPONSEEEE ",response)
        return res.status(200).json({
            success: "true",
            message : response
        })

    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            error: "Error"
        });
    }

}