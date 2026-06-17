import mongoose, { mongo } from "mongoose";

export interface IUser {
    _id? : string
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string | undefined;
  booksAdded?: string[];
  token? : string
  role: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    booksAdded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    role: {
      type: String,
      enum: ["admin", "creater", "visitor"],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
