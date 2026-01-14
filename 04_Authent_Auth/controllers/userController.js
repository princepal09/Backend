const User = require("../model/signUpUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUpController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Create entry for user
    const userData = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    userData.password = undefined;

    console.log(userData);

    return res.status(201).json({
      success: true,
      message: "User Created Successfull",
      data: userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: false,
      message: err.message,
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
      // password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Logged in Successfully`,
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
