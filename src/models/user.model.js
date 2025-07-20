const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "PARTNER"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profile_url: String,
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
