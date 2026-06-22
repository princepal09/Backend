import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AuthRequest, IResponse } from "../utils/types.js";
import User from "../models/user.model.js";
import { generateToken } from "../utils/utils.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      } as IResponse);
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters long",
      } as IResponse);
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the email",
      } as IResponse);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPwd,
    });

    if (newUser) {
      generateToken(newUser._id.toString(), res);
      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "Signup successfully",
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      } as IResponse);
    } else {
      return res.status(400).json({
        success: false,
        message: " Invalid user Data",
      } as IResponse);
    }
  } catch (err: any) {
    console.log("ERROR IN SIGNUP CONTROLLER", err.message);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!",
      } as IResponse);
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist with the email",
      } as IResponse);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      } as IResponse);
    }

    generateToken(user._id.toString(), res);
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    } as IResponse);
  } catch (err: any) {
    console.log("ERROR IN LOGIN CONTROLLER", err.message);

    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt", {
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    } as IResponse);
  } catch (err: any) {
    console.log("ERROR IN LOGOUT CONTROLLER", err.message);

    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
  const {profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({
        success: false,
        message: "Atleast one field is required to update profile",
      } as IResponse);
    }

    const userId = req.user._id;

    




  } catch (err: any) {
    console.log("ERROR IN UPDATE PROFILE CONTROLLER", err.message);

    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};
