export const otpTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
        
        <h2 style="color: #333;">OTP Verification</h2>
        
        <p style="color: #555; font-size: 16px;">
          Your One-Time Password (OTP) is:
        </p>
        
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; margin: 20px 0;">
          ${otp}
        </div>
        
        <p style="color: #777; font-size: 14px;">
          This OTP is valid for <b>5 minutes</b>.
        </p>
        
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          If you did not request this, please ignore this email.
        </p>
      
      </div>
    </div>
  `;
};