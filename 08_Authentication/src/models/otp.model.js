import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60
    },
})

// otpSchema.pre("save", async function () {
//     if(!this.isModified("otp")){
//         return;
//     }
//     const otpHash = await bcrypt.hash(this.otp, 10);
//     this.otp = otpHash
// })


otpSchema.methods.compareOtp = async function (otp) {
    return await bcrypt.compare(otp, this.otp)
}

export const OTP = mongoose.model("OTP", otpSchema)