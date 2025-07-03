const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpVerification: String,
    otpVerificationExpiresAt: Date,
    resetPasswordOtpVerification: String,
    resetPasswordOtpVerificationExpiresAt: Date,
    resetPasswordTokenVerification: String,
    resetPasswordTokenVerificationExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = { User };
