import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { JWT_SECRET,NODE_ENV } from '../config/secrets.config.js'

export const generateToken = (userId : string, res :Response ) =>{
       const token = jwt.sign({userId}, JWT_SECRET, {
              expiresIn : "15m"
       })

       console.log("token in signup", token)

       res.cookie("jwt", token, {
              httpOnly : true, // prevent from cookie access from js  XSS ATTACK 
              maxAge : 15 * 60 * 1000, // 15m
              sameSite : 'lax',
              secure : NODE_ENV !== "development"

       })     

       return token;
}