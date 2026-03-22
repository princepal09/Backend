import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password must be same"
            })
        }

        const existingUser = await User.findOne({ email });;
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        } 

        const hashPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            password: hashPass,
            email
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        })



    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: "SERVER ERROR",
            error: err.message
        })


    }
}