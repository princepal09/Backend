import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/user.model.js'
import {Request, Response, NextFunction} from 'express'
import { JWT_SECRET } from '../config/secrets.config.js';
import { AuthRequest, IResponse } from '../utils/types.js';

export const auth = async(req:AuthRequest, res:Response, next:NextFunction) => {

 try{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Unauthorized access"
        })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

     if(!decoded){
        return res.status(401).json({
            success : false,
            message : "Unauthorized access : INVALID TOKEN"
        })
    }

    const user = await User.findById(decoded.userId ).select("-password");

        if(!user){
        return res.status(401).json({
            success : false,
            message : "User not found"
        })
    }

    req.user = user;

    next();

 } catch (err: any) {
     console.log("ERROR IN AUTH MIDDLEWARE", err.message);
 
     return res.status(500).json({
       success: false,
       message: "INTERNAL SERVER ERROR",
     } as IResponse);
   }
}