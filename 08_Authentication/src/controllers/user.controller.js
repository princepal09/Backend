import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import otpGenerator from "otp-generator"
import { sendVerificationMail } from "../mail/mailTypes.js";

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        await OTP.deleteMany({email})

        const otp =  otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        await sendVerificationMail(email, otp);

        await OTP.create({
           email, otp
        })

        return res.status(200).json({
                success : true,
                message : "Successfully sent OTP to your mail"
        })



    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: "Unable to send OTP ",
            error: err.message

        })
    }
}


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
        const user = await User.create({
            firstname,
            lastname,
            password,
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