import mongoose  from "mongoose";

export const userSchema = new mongoose.Schema({

    firstname : {
        type : String,
        required : [true, "First Name is required"],
        trim : [true, "First Name must be trimmed"],
    },
    lastname :{
        type : String,
        required : [true, "Last Name is required"],
        trim : [true, "Last Name must be trimmed"],
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email must be unique"],
        lowercase : [true, "Email must be in lowercase"],
        trim : [true, "Email must be trimmed"],
        match : [/\S+@\S+\.\S+/, "Email is invalid"]
    },

    password : {
        type : String,
        required : [true, "Password is required"],
    },
    
    confirmPassword : {
        type : String,
        required : [true, "Confirm Password is required"],
    },




},{timestamps : true})


module.exports = mongoose.model("User", userSchema)