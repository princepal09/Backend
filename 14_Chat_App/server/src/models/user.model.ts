import mongoose from "mongoose";

interface IUser {
    email : string,
    fullName : string,
    password : string,
    profilePic?: string
}

const userSchema= new mongoose.Schema<IUser> (
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);


const User = mongoose.model("User", userSchema)

export default User;