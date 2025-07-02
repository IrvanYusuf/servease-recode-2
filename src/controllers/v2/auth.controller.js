import { User } from "@/models/user.model";
import ApiResponse from "@/utils/response";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { SALT_BCRYPT } from "@/constant/constant";
import { generateOtp } from "@/utils/generateOtp";
import { generateJwtToken } from "@/utils/generateJwtToken";
import { getAppTimezone } from "@/utils/getAppTimezone";
import dayjs from "@/utils/dayjs.js";
import {
  changePasswordValidation,
  forgotPasswordValidation,
  loginSchemaValidation,
  otpVerificationValidation,
  resetPasswordValidation,
  resetPasswordValidationWeb,
} from "@/validation/auth.validation";
import {
  mobileEmailTemplateForgotPasswordOtp,
  sendEmailTemplate,
  webEmailTemplateForgotPasswordOtp,
} from "@/utils/sendEmailTemplate";

import crypto from "crypto";


class AuthController {
  static register = async (req, res) => {
    try {
      const body = req.body;

      const checkExistingUser = await User.findOne({ email: body.email });
      if (checkExistingUser) {
        return ApiResponse.errorResponse(
          res,
          "Email already registered",
          { email: "Email already registered" },
          StatusCodes.CONFLICT
        );
      }

      const hashedPassword = await bcrypt.hash(body.password, SALT_BCRYPT);
      const otp = generateOtp();

      const expiredOtp = dayjs().tz(getAppTimezone()).add(1, "days").toDate();

      const user = new User({
        name: body.name,
        email: body.email,
        password: hashedPassword,
        otpVerification: otp,
        otpVerificationExpiresAt: expiredOtp, // expired in 1 day
      });

      await user.save();

      // jwt token
      const payloadToken = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const token = generateJwtToken(payloadToken);

      const dataResponse = {
        user: { ...payloadToken },
        token,
      };

      return ApiResponse.successResponse(
        res,
        "success register user",
        dataResponse,
        null,
        StatusCodes.CREATED
      );
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.986Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const body = req.body;
      const result = loginSchemaValidation.validate(body, {
        abortEarly: false,
      });

      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));

        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }
      const data = result.value;
      const checkExistingUser = await User.findOne({ email: data.email });
      if (!checkExistingUser) {
        return ApiResponse.errorResponse(
          res,
          "User not found",
          { email: "User not found" },
          StatusCodes.NOT_FOUND
        );
      }

      const checkPassword = await bcrypt.compare(
        data.password,
        checkExistingUser.password
      );

      if (!checkPassword) {
        return ApiResponse.errorResponse(
          res,
          "Invalid credential",
          { auth: "Invalid credential" },
          StatusCodes.UNAUTHORIZED
        );
      }
      // jwt token
      const payloadToken = {
        id: checkExistingUser._id,
        name: checkExistingUser.name,
        email: checkExistingUser.email,
        role: checkExistingUser.role,
      };
      const token = generateJwtToken(payloadToken);

      const dataResponse = {
        user: { ...payloadToken },
        token,
      };

      return ApiResponse.successResponse(
        res,
        "success login user",
        dataResponse,
        null,
        StatusCodes.OK
      );
    } catch (error) {
     console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static verifyOtp = async (req, res) => {
    try {
      const result = otpVerificationValidation.validate(req.body, {
        abortEarly: false,
      });
      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));
        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }

      const { otp, email } = result.value;
      const user = await User.findOne({
        email,
        otpVerification: otp,
        otpVerificationExpiresAt: { $gt: new Date() },
      });
      if (!user) {
        return ApiResponse.errorResponse(
          res,
          "otp invalid or expires",
          {
            otp: "otp invalid or expired",
          },
          StatusCodes.BAD_REQUEST
        );
      }

      // user.otpVerification = "";
      // user.otpVerificationExpiresAt = null;
      user.set("otpVerification", undefined, {
        strict: false,
      });
      user.set("otpVerificationExpiresAt", undefined, {
        strict: false,
      });
      user.isVerified = true;

      await user.save();
      return ApiResponse.successResponse(res, "OTP verified successfully");
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static me = async (req, res) => {
    try {
      const userId = req.user.id; // from authMiddleware
      const user = await User.findById(userId).select(
        "-password -otpVerification -otpVerificationExpiresAt -resetPasswordOtpVerification -resetPasswordOtpVerificationExpiresAt"
      );
      return ApiResponse.successResponse(
        res,
        "success get detail profile me",
        user
      );
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static logout = async (req, res) => {
    // Di frontend, cukup hapus token dari storage (local storage atau session storage)
    return ApiResponse.successResponse(res, "Logout successful");
  };

  static changePassword = async (req, res) => {
    try {
      const result = changePasswordValidation.validate(req.body, {
        abortEarly: false,
      });

      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));

        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }

      const userId = req.user?.id; // diambil dari auth middleware
      const user = await User.findById(userId);
      if (!user) {
        return ApiResponse.errorResponse(
          res,
          "User not found",
          { auth: "Invalid session" },
          StatusCodes.UNAUTHORIZED
        );
      }

      const { currentPassword, newPassword } = result.value;

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return ApiResponse.errorResponse(
          res,
          "Wrong current password",
          { currentPassword: "Wrong password" },
          StatusCodes.UNAUTHORIZED
        );
      }

      user.password = await bcrypt.hash(newPassword, SALT_BCRYPT);
      await user.save();

      return ApiResponse.successResponse(res, "Password changed successfully");
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static forgotPasswordMobile = async (req, res) => {
    try {
      const result = forgotPasswordValidation.validate(req.body, {
        abortEarly: false,
      });
      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));

        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }

      const { email } = result.value;
      const user = await User.findOne({ email });
      if (!user) {
        return ApiResponse.errorResponse(
          res,
          "User not found",
          { email: "User not found" },
          StatusCodes.NOT_FOUND
        );
      }

      const otp = generateOtp();
      user.resetPasswordOtpVerification = otp;
      user.resetPasswordOtpVerificationExpiresAt = dayjs()
        .tz(getAppTimezone())
        .add(15, "minutes")
        .toDate();
      await user.save();

      // TODO: kirim OTP ke email
      sendEmailTemplate(
        email,
        "Reset Password OTP",
        mobileEmailTemplateForgotPasswordOtp(user, otp)
      );
      console.log(`OTP sent to ${email}: ${otp}`);

      return ApiResponse.successResponse(res, "OTP sent to your email");
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static forgotPasswordWeb = async (req, res) => {
    try {
      const result = forgotPasswordValidation.validate(req.body, {
        abortEarly: false,
      });
      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));

        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }

      const { email } = result.value;
      const user = await User.findOne({ email });
      if (!user) {
        return ApiResponse.errorResponse(
          res,
          "User not found",
          { email: "User not found" },
          StatusCodes.NOT_FOUND
        );
      }

      const token = crypto.randomBytes(32).toString("hex");
      user.resetPasswordTokenVerification = token;
      user.resetPasswordTokenVerificationExpiresAt = dayjs()
        .tz(getAppTimezone())
        .add(15, "minutes")
        .toDate();
      await user.save();

      // TODO: kirim OTP ke email
      sendEmailTemplate(
        email,
        "Reset Password Link",
        webEmailTemplateForgotPasswordOtp(user, token)
      );
      console.log(`OTP sent to ${email}: ${otp}`);

      return ApiResponse.successResponse(
        res,
        "Reset link password sent to your email"
      );
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static verifyForgotPasswordOtp = async (req, res) => {
    try {
      const result = otpVerificationValidation.validate(req.body, {
        abortEarly: false,
      });
      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));
        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }

      const { otp, email } = result.value;
      const user = await User.findOne({
        email,
        resetPasswordOtpVerification: otp,
        resetPasswordOtpVerificationExpiresAt: { $gt: new Date() },
      });
      if (!user) {
        return ApiResponse.errorResponse(
          res,
          "otp invalid or expires",
          {
            otp: "otp invalid or expired",
          },
          StatusCodes.BAD_REQUEST
        );
      }

      await user.save();

      return ApiResponse.successResponse(res, "OTP verified successfully");
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static resetPasswordMobile = async (req, res) => {
    try {
      const result = resetPasswordValidation.validate(req.body, {
        abortEarly: false,
      });

      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));

        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }

      const { email, newPassword } = result.value;
      const user = await User.findOne({ email });
      if (!user) {
        return ApiResponse.errorResponse(
          res,
          "User not found",
          { auth: "Invalid session" },
          StatusCodes.UNAUTHORIZED
        );
      }

      user.password = await bcrypt.hash(newPassword, SALT_BCRYPT);
      user.set("resetPasswordOtpVerification", undefined, { strict: false });
      user.set("resetPasswordOtpVerificationExpiresAt", undefined, {
        strict: false,
      });
      user.set("otpVerification", undefined, {
        strict: false,
      });
      user.set("otpVerificationExpiresAt", undefined, {
        strict: false,
      });
      await user.save();

      return ApiResponse.successResponse(res, "Password changed successfully");
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static resetPasswordWeb = async (req, res) => {
    try {
      const result = resetPasswordValidationWeb.validate(req.body, {
        abortEarly: false,
      });

      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));

        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }

      const { email, newPassword, token } = result.value;
      const user = await User.findOne({
        email,
        resetPasswordTokenVerification: token,
        resetPasswordTokenVerificationExpiresAt: { $gt: new Date() },
      });
      if (!user) {
        return ApiResponse.errorResponse(
          res,
          "User not found",
          { auth: "Invalid session" },
          StatusCodes.UNAUTHORIZED
        );
      }

      user.password = await bcrypt.hash(newPassword, SALT_BCRYPT);
      user.set("resetPasswordTokenVerification", undefined, { strict: false });
      user.set("resetPasswordTokenVerificationExpiresAt", undefined, {
        strict: false,
      });
      user.set("otpVerification", undefined, {
        strict: false,
      });
      user.set("otpVerificationExpiresAt", undefined, {
        strict: false,
      });
      await user.save();

      return ApiResponse.successResponse(res, "Password changed successfully");
    } catch (error) {
      console.error(`[2025-07-02T07:32:23.987Z]`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

export default AuthController;
