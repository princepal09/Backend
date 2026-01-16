const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const transporter = require("../config/nodemailer");

fileSchema.post("save", async function (doc) {
  try {
    // send mail 
    let info = await transporter.sendMail({
      from: `"Prince Pal" <${process.env.MAIL_USER}>`,
      to: doc.email,
      subject: "New Image Uploaded on Cloudinary",
      html: `
        <h1>HEYYY GUYSSS THISS IS YOURRR IMAGEEEE</h1>
        <a href="${doc.imageUrl}">${doc.imageUrl}</a>
      `,
    });

    console.log("Mail sent:", info.messageId);
  } catch (err) {
    console.log("Mail error:", err.message);
  }
});


module.exports = mongoose.model("File", fileSchema);
