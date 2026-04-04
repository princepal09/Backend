const User = require("../model/signUpUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUpController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(404).json({
        success: false,
        message: "All Fields are required !!",
      });
    }

    const exitisingUser = await User.findOne({ email });
    if (exitisingUser) {
      return res.status(400).json({
        success: false,
        message: "User  already exists ",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error in Hashing Password",
      });
    }

    const userData = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    userData.password = undefined;

    return res.status(200).json({
      success: true,
      userData,
      message: "User Registered Successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};


exports.login = async (req, res) => {
  try {
    // data fetch
    const { email, password } = req.body;

    // validation on email and password
    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    // check for registered user
    const user = await User.findOne({ email });

    // if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // verify  password and generate a jwt token
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.password = undefined;
      user.token = token
      const options = {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      };

      return res.cookie("token", token, options).status(200).json({
        token: token,
        success: true,
        data: user,
        message: "User Logged In Successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err.message,
    });
  }
};

