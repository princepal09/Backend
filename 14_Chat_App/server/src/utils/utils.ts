import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { JWT_SECRET,NODE_ENV } from '../config/secrets.config.js'

export const generateToken = (userId : string, res :Response ) =>{
       const token = jwt.sign({userId}, JWT_SECRET, {
              expiresIn : "7d"
       })

       res.cookie("jwt", token, {
              httpOnly : true, // prevent from cookie access from js  XSS ATTACK 
              maxAge : 7 * 24 * 60 * 60 * 1000, // 7d
              sameSite : 'lax',
              secure : NODE_ENV !== "development"

       })     

       return token;
}