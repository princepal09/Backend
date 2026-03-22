import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
}, { timestamps: true });

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
}
)

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);

}


export const User =  mongoose.model("User", userSchema);