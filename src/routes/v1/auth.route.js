const express = require("express");
const AuthController = require("@/controllers/v1/auth.controller.js");
const authMiddleware = require("@/middlewares/auth.middleware.js");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);
router.post("/verify-otp-account", AuthController.verifyOtp);
router.post("/change-password", authMiddleware, AuthController.changePassword);

// forgot password mobile device
router.post("/forgot-password-mobile", AuthController.forgotPasswordMobile);

// forgot password web
router.post("/forgot-password-web", AuthController.forgotPasswordWeb);

// reset password mobile
router.post("/reset-password-mobile", AuthController.resetPasswordMobile);

// reset password web
router.post("/reset-password-web", AuthController.resetPasswordWeb);

// verify otp forgot password mobile
router.post(
  "/verify-otp-forgot-password",
  AuthController.verifyForgotPasswordOtp
);

// get user profile
router.get("/me", authMiddleware, AuthController.me);

module.exports = router;
