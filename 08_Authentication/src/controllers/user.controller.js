import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import otpGenerator from "otp-generator"
import { sendVerificationMail } from "../mail/mailTypes.js";
import bcrypt from 'bcrypt'


export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please log in to continue"
            })
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const hashOtp = await bcrypt.hash(otp, 10)

        await OTP.findOneAndUpdate({ email }, {
            $set: {
                email,
                otp: hashOtp,
                createdAt: Date.now()
            }
        }, { upsert: true, returnDocument: "after" },)


        await sendVerificationMail(email, otp);


        return res.status(200).json({
            success: true,
            message: "Successfully sent OTP to your mail"
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
        const { firstname, lastname, email, otp, password, confirmPassword } = req.body;

        if (!firstname || !lastname || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password should be same"
            })
        }

        const isExists = await User.findOne({ email });
        if (isExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please log in to continue"
            })
        }

        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 })

        // OTP not found for this email
        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid because otp data is empty for this email",
            })
        }

        const isMatch = await bcrypt.compare(otp.toString(), recentOtp.otp);


        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid"
            })
        }


        const user = await User.create({
            email, firstname, lastname, password,
        })

        user.password = undefined

        await OTP.deleteOne({ email })

        return res.status(201).json({
            success: true,
            message: "User signup successfully",
            user
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