import { IResponse } from "../controllers/book.controller";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../secrets";
import jwt, { JwtPayload } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers?.authorization?.split(" ")[1] ||
      req.body?.token ||
      req.cookies?.token;

    console.log("token", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      } as IResponse);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: string;
      role: string;
    };

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = decoded;
    return next();
  } catch (err: any) {
    console.log("Unable to verify Token", err.message);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};

type Role = "admin" | "creator" | "visitor"

const authorize = (requiredRole : Role) =>{
    return (req:Request, res:Response, next : NextFunction) =>{
      const role = req.user?.role;

      if(role !== requiredRole){
        return res.status(403).json({
          success : false,
          message : `You are not ${requiredRole}`
        } as IResponse)
      }

      next();
    }
}


export const isAdmin = authorize("admin")
export const isCreator = authorize("creator")
export const isVisitor = authorize("visitor")