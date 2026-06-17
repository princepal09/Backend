import { IResponse } from "../controllers/book.controller";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../secrets";
import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
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

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {id : string, role : string};

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
