"use strict";

var Joi = require("joi");
var registerSchemaValidation = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required"
  }),
  name: Joi.string().required().messages({
    "string.empty": "Name is required"
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  password: Joi.string().min(3).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 3 characters"
  }),
  phone: Joi.string().min(12).max(15).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Phone number must be at least 12 digits",
    "string.max": "Phone number max 15 digits"
  }),
  gender: Joi.string().valid("MALE", "FEMALE").required().messages({
    "any.only": "Gender must be either MALE or FEMALE",
    "string.empty": "Gender is required"
  }),
  role: Joi.string().valid("USER", "ADMIN", "PARTNER").required().messages({
    "any.only": "role must be either USER, ADMIN or PARTNER",
    "string.empty": "role is required"
  }),
  birthDate: Joi.date().required().messages({
    "date.base": "Birth date must be a valid date",
    "any.required": "Birth date is required"
  })
});
var updateUserSchemaValidation = Joi.object({
  name: Joi.string().min(3).optional().messages({
    "string.min": "Name too short"
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid email address"
  }),
  phone: Joi.string().min(12).max(15).optional().messages({
    "string.min": "Phone number must be at least 12 digits",
    "string.max": "Phone number max 15 digits"
  }),
  gender: Joi.string().valid("MALE", "FEMALE").optional().messages({
    "any.only": "Gender must be either MALE or FEMALE"
  }),
  birthDate: Joi.date().optional().messages({
    "date.base": "Birth date must be a valid date"
  })
});
var loginSchemaValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  password: Joi.string().min(3).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password too short"
  })
});
var otpVerificationValidation = Joi.object({
  otp: Joi.string().min(1).max(6).required().messages({
    "string.empty": "OTP is required",
    "string.min": "OTP is required",
    "string.max": "OTP must not be more than 6 characters"
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format"
  })
});
var changePasswordValidation = Joi.object({
  currentPassword: Joi.string().min(3).required().messages({
    "string.empty": "Current password is required",
    "string.min": "Current password too short"
  }),
  newPassword: Joi.string().min(3).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password too short"
  })
});
var forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format"
  })
});
var resetPasswordValidation = Joi.object({
  newPassword: Joi.string().min(3).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password too short"
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format"
  })
});
var resetPasswordValidationWeb = resetPasswordValidation.concat(Joi.object({
  token: Joi.string().length(64).hex().required().messages({
    "string.empty": "Token is required",
    "string.length": "Token length must be 64 characters",
    "string.hex": "Token must be a valid hexadecimal string"
  })
}));
module.exports = {
  changePasswordValidation: changePasswordValidation,
  forgotPasswordValidation: forgotPasswordValidation,
  loginSchemaValidation: loginSchemaValidation,
  otpVerificationValidation: otpVerificationValidation,
  resetPasswordValidation: resetPasswordValidation,
  resetPasswordValidationWeb: resetPasswordValidationWeb,
  registerSchemaValidation: registerSchemaValidation,
  updateUserSchemaValidation: updateUserSchemaValidation
};