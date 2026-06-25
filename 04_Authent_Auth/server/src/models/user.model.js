import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        index: true,
        match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"],
        select : false,

    }, role: {
        type: String,
        enum: ["user", "admin"],
        required : true
    },

}, { timestamps: true });

userSchema.methods.isPwdMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);