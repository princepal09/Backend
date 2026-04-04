import { uploadOnCloudinary } from "../utils/cloudinary/cloudinary.js";

export const contactController = async (req, res) => {

    try {

        const { name, email, message } = req.body
        const file = req.file
        if (!name || !email || !message || !file) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const result = await uploadOnCloudinary(file.path)
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "File upload failed",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact form submitted successfully",
            data: {
                name,
                email,
                message,
                fileUrl : result.secure_url,
            }

        });



    } catch (err) {
        console.error("Contact Error:", err.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });

    }
}