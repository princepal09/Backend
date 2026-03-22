import { sendMail } from "./mailService.js"
import { otpTemplate } from "./templates/emailVerificationTemplate.js"

export const sendVerificationMail = async (email, otp) => {
  try {
    const mailResponse = await sendMail(
      email,
      'Verification Mail',
      otpTemplate(otp)
    )

    console.log("Email sent:", mailResponse.messageId)

  } catch (err) {
    console.error("Error sending verification mail:", err.message)
    throw err
  }
}