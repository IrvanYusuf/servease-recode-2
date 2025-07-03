const Joi = require("joi");

const loginSchemaValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().min(3).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password too short",
  }),
});

const otpVerificationValidation = Joi.object({
  otp: Joi.string().min(1).max(6).required().messages({
    "string.empty": "OTP is required",
    "string.min": "OTP is required",
    "string.max": "OTP must not be more than 6 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
});

const changePasswordValidation = Joi.object({
  currentPassword: Joi.string().min(3).required().messages({
    "string.empty": "Current password is required",
    "string.min": "Current password too short",
  }),
  newPassword: Joi.string().min(3).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password too short",
  }),
});

const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
});

const resetPasswordValidation = Joi.object({
  newPassword: Joi.string().min(3).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password too short",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
});

const resetPasswordValidationWeb = resetPasswordValidation.concat(
  Joi.object({
    token: Joi.string().length(64).hex().required().messages({
      "string.empty": "Token is required",
      "string.length": "Token length must be 64 characters",
      "string.hex": "Token must be a valid hexadecimal string",
    }),
  })
);

module.exports = {
  changePasswordValidation,
  forgotPasswordValidation,
  loginSchemaValidation,
  otpVerificationValidation,
  resetPasswordValidation,
  resetPasswordValidationWeb,
};
