import transporter from "@/config/email.js";

export const sendEmailTemplate = async (email, subject, emailTemplate) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject,
      html: emailTemplate,
    });
    console.log(`Email sent to ${email}`);
  } catch (err) {
    console.error("Failed to send email:", err.message);
    throw err; // biar bisa ditangkap di controller kalau gagal
  }
};

export const mobileEmailTemplateForgotPasswordOtp = (user, otp) => {
  let template = `
     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #333;">OTP Reset Password</h2>
      <p>Hi ${user?.name || "there"},</p>
      <p>this your OTP for reset password:</p>
      <div style="display: inline-block; padding: 10px 20px; background-color: #0052cc; color: white; text-decoration: none; border-radius: 4px; margin-top: 10px; letter-spacing: 6px; font-size: 16px;">
        ${otp}
      </div>
      <p style="color: #555;">This otp will expire in 15 minutes.</p>
      <p style="margin-top: 40px;">Thanks,<br/>Our Team</p>
    </div>`;
  return template;
};

export const webEmailTemplateForgotPasswordOtp = (user, token) => {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const url = `${baseUrl}/reset-password?token=${token}&credential=${encodeURIComponent(
    user._id
  )}`;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #333;">Reset Password</h2>
      <p>Hi ${user?.name || "there"},</p>
      <p>Click the button below to verify your OTP and reset your password:</p>
      <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #0052cc; color: white; text-decoration: none; border-radius: 4px; margin-top: 10px;">
        Reset link password
      </a>
      <p style="color: #555;">This link will expire in 15 minutes.</p>
      <p style="margin-top: 40px;">Thanks,<br/>Our Team</p>
    </div>
  `;
};
