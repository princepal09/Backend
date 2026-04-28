import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import otpGenerator from "otp-generator"
import { sendVerificationMail } from "../mail/mailTypes.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from "../config/config.js";


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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            })
        }


        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const isMatchPwd = await user.comparePassword(password);
        if (!isMatchPwd) {
            return res.status(401).json({
                status: false,
                message: "Invalid credentials"
            })
        }


        // access token generates
        const accessToken = jwt.sign({ id: user._id },
            config.JWT_SECRET,
            {
                expiresIn: '15m'
            })

        // refresh Token generates

        const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(201).json({
            message: "User Login successfully",
            accessToken
        })


    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            status: false,
            message: "Server Error",
            error: err.message
        })
    }
}

export const 