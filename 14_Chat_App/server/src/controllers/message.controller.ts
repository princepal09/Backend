import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { AuthRequest, IResponse } from "../utils/types.js";
import { Response } from "express";
import mongoose from "mongoose";

export const getUserForSideBar = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user.id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "User FETCH successfully",
      data: filteredUsers,
    } as IResponse);
  } catch (err: any) {
    console.log("ERROR IN getUserForSideBar CONTROLLER", err.message);

    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const userToChatId = req.params.id as string;

    if (!userToChatId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          recieverId: userToChatId,
        },
        {
          senderId: userToChatId,
          recieverId: myId,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (err: any) {
    console.log("ERROR IN getMessages CONTROLLER", err.message);

    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
  } catch (err: any) {
    console.log("ERROR IN sendMessage  CONTROLLER", err.message);

    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};
