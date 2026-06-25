import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/utils.js";

export const signup = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;
        if (!name || !email || !role || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(409).json({
                success: false,
                message: "User Exists, Please login to continue"
            })
        }

        const hashPwd = await bcrypt.hash(password, 10);

        const user = new User({ name, email, role, password : hashPwd});

        await user.save();

        return res.status(201).json({
            success: true,
            message: "Successfully Account Created"
        })


    } catch (err) {
        console.log("ERROR in signup controller", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const login = async(req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(role)
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'All details are required'
            })
        }

        const user = await User.findOne({ email }).select("+password")
        console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Please signup first"
            }
            )
        }

        if (role !== user.role) {
            return res.status(403).json({
                success: false,
                message: "Role is not matching"
            })
        }

       const PwdMatch = await user.isPwdMatch(password) 

        if (!PwdMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is not matching"
            })
        }

        const token = await generateToken(user)
        if (!token) {
            return res.json({
                success: false,
                message: "Error in generating token"
            })
        }

        user.password = undefined;  

        const options = {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        }
        return res.cookie("tokenn", token, options).status(200).json({
            success: true,
            token,
            data: user  
        })

    }
    catch (err) {
        console.log("ERROR in login controller", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        return res.status(200).json({
            success: true,
            data:user
        });

    } catch (err) {
        console.log("ERROR in getMe controller", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("tokenn");
        return res.status(200).json({
            success: true,
            message: "Successfully logged out"
        })
    }
    catch (err) {
        console.log("ERROR in logout controller", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}   