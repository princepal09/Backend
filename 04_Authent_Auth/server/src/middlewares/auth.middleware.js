
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/secrets.config.js';

export const auth = async (req, res, next) => {
    try {
        console.log(req.headers);

        const token = req.headers?.authorization?.split(" ")[1]; 
        console.log("token", token)
        console.log(req.headers.authorization)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing, Unauthorized access"
            })
        }

        const decode = jwt.verify(token, JWT_SECRET);

        req.user = decode;

        next();


    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }
}

export const isAdmin = async (req, res, next) => {
    try {

        if (req.user.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this route"
            })
        }

    } catch (err) {
        console.error("Authorization Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const isUser = async (req, res, next) => {
    try {
        if (req.user.role !== 'User') {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this route"
            });
        }
        next();
    } catch (err) {
        console.error("Authorization Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
