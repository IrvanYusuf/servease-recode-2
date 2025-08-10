"use strict";

var express = require("express");
var AuthController = require("../../controllers/v1/auth.controller.js");
var authMiddleware = require("../../middlewares/auth.middleware.js");
var validateMiddleware = require("../../middlewares/validate.middleware");
var _require = require("../../validation/auth.validation"),
  registerSchemaValidation = _require.registerSchemaValidation,
  loginSchemaValidation = _require.loginSchemaValidation,
  otpVerificationValidation = _require.otpVerificationValidation,
  changePasswordValidation = _require.changePasswordValidation,
  forgotPasswordValidation = _require.forgotPasswordValidation,
  resetPasswordValidation = _require.resetPasswordValidation,
  resetPasswordValidationWeb = _require.resetPasswordValidationWeb;
var router = express.Router();
router.post("/register", validateMiddleware(registerSchemaValidation), AuthController.register);
router.post("/login", validateMiddleware(loginSchemaValidation), AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);
router.post("/verify-otp-account", validateMiddleware(otpVerificationValidation), AuthController.verifyOtp);
router.post("/change-password", authMiddleware, validateMiddleware(changePasswordValidation), AuthController.changePassword);

// forgot password mobile device
router.post("/forgot-password-mobile", validateMiddleware(forgotPasswordValidation), AuthController.forgotPasswordMobile);

// forgot password web
router.post("/forgot-password-web", validateMiddleware(forgotPasswordValidation), AuthController.forgotPasswordWeb);

// reset password mobile
router.post("/reset-password-mobile", validateMiddleware(resetPasswordValidation), AuthController.resetPasswordMobile);

// reset password web
router.post("/reset-password-web", validateMiddleware(resetPasswordValidationWeb), AuthController.resetPasswordWeb);

// verify otp forgot password mobile
router.post("/verify-otp-forgot-password", validateMiddleware(otpVerificationValidation), AuthController.verifyForgotPasswordOtp);

// get user profile
router.get("/me", authMiddleware, AuthController.me);
module.exports = router;