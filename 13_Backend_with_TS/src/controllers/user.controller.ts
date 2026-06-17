import { IResponse } from "./book.controller";
import { Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, username, password, role } = req.body;
    if (!email || !name || !phone || !username || !password || !role) {
      return res.status(401).json({
        success: false,
        message: "ALL FIELD MUST BE REQUIRED",
      } as IResponse);
    }

    let user: IUser | null;

    user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Please Login",
      } as IResponse);
    }

    const hashPwd = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      phone,
      username,
      password: hashPwd,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successfully",
      data: user,
    } as IResponse);
  } catch (err: any) {
    console.log("Unable to Sign Up", err.message);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || username || !password) {
      return res.status(401).json({
        success: false,
        message: "Username and password must be required",
      } as IResponse);
    }

    let user: IUser | null;

    user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please SignUp First",
      } as IResponse);
    }

    const isPwdMatch = await bcrypt.compare(password, user.password as string);

    if (!isPwdMatch) {
      return res.status(401).json({
        success: false,
        message: "Password incorrect",
      } as IResponse);
    }

    const payload = {
      id : user._id,
      role : user.role

    };

    const token =  jwt.sign(payload, JWT_SECRET, {
      expiresIn: "15m",
    });

    user.password = undefined;
    user.token = token

    return res.cookie("token", token).status(200).json({
      success: true,
      message: "Login successfully",
      data : user
    } as IResponse);
  } catch (err: any) {
    console.log("Unable to Sign Up", err.message);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};