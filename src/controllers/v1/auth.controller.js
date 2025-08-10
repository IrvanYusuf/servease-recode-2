const { User } = require("@/models/user.model.js");
const ApiResponse = require("@/utils/response.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { SALT_BCRYPT } = require("@/constant/constant.js");
const generateOtp = require("@/utils/generateOtp.js");
const generateJwtToken = require("@/utils/generateJwtToken.js");
const getAppTimezone = require("@/utils/getAppTimezone.js");
const dayjs = require("@/utils/dayjs.js");

const {
  mobileEmailTemplateForgotPasswordOtp,
  sendEmailTemplate,
  webEmailTemplateForgotPasswordOtp,
} = require("@/utils/sendEmailTemplate.js");

const crypto = require("crypto");
const ApiError = require("@/errors/apiError");

class AuthController {
  static register = async (req, res, next) => {
    const data = req.validated;

    const checkExistingUser = await User.findOne({ email: data.email });
    if (checkExistingUser) {
      return next(
        new ApiError("Email already registered", StatusCodes.CONFLICT)
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_BCRYPT);
    const otp = generateOtp();

    const expiredOtp = dayjs().tz(getAppTimezone()).add(1, "days").toDate();

    const user = new User({
      name: data.name,
      email: data.email,
      gender: data.gender,
      phone: data.phone,
      role: data.role,
      username: data.username,
      password: hashedPassword,
      birthDate: data.birthDate,
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
  };

  static login = async (req, res, next) => {
    const data = req.validated;
    const checkExistingUser = await User.findOne({ email: data.email });
    if (!checkExistingUser) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
    }

    const checkPassword = await bcrypt.compare(
      data.password,
      checkExistingUser.password
    );

    if (!checkPassword) {
      return next(new ApiError("Invalid credential", StatusCodes.UNAUTHORIZED));
    }
    // jwt token
    const payloadToken = {
      id: checkExistingUser._id,
      name: checkExistingUser.name,
      email: checkExistingUser.email,
      role: checkExistingUser.role,
      isVerified: checkExistingUser.isVerified,
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
  };

  static verifyOtp = async (req, res, next) => {
    const { otp, email } = req.validated;
    const user = await User.findOne({
      email,
      otpVerification: otp,
      otpVerificationExpiresAt: { $gt: new Date() },
    });
    if (!user) {
      return next(
        new ApiError("otp invalid or expires", StatusCodes.BAD_REQUEST)
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
  };

  static me = async (req, res, next) => {
    const userId = req.user.id; // from authMiddleware
    const user = await User.findById(userId).select(
      "-password -otpVerification -otpVerificationExpiresAt -resetPasswordOtpVerification -resetPasswordOtpVerificationExpiresAt"
    );
    if (!user) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
    }
    return ApiResponse.successResponse(
      res,
      "success get detail profile me",
      user
    );
  };

  static logout = async (req, res) => {
    // Di frontend, cukup hapus token dari storage (local storage atau session storage)
    return ApiResponse.successResponse(res, "Logout successful");
  };

  static changePassword = async (req, res, next) => {
    const userId = req.user?.id; // diambil dari auth middleware
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError("User not found", StatusCodes.UNAUTHORIZED));
    }

    const { currentPassword, newPassword } = req.validated;

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return next(
        new ApiError("Wrong current password", StatusCodes.UNAUTHORIZED)
      );
    }

    user.password = await bcrypt.hash(newPassword, SALT_BCRYPT);
    await user.save();

    return ApiResponse.successResponse(res, "Password changed successfully");
  };

  static forgotPasswordMobile = async (req, res, next) => {
    const { email } = req.validated;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
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
  };

  static forgotPasswordWeb = async (req, res, next) => {
    const { email } = req.validated;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
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
  };

  static verifyForgotPasswordOtp = async (req, res, next) => {
    const { otp, email } = req.validated;
    const user = await User.findOne({
      email,
      resetPasswordOtpVerification: otp,
      resetPasswordOtpVerificationExpiresAt: { $gt: new Date() },
    });
    if (!user) {
      return next(
        new ApiError("otp invalid or expires", StatusCodes.BAD_REQUEST)
      );
    }

    await user.save();

    return ApiResponse.successResponse(res, "OTP verified successfully");
  };

  static resetPasswordMobile = async (req, res, next) => {
    const { email, newPassword } = req.validated;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError("User not found", StatusCodes.NOT_FOUND));
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
  };

  static resetPasswordWeb = async (req, res, next) => {
    const { email, newPassword, token } = req.validated;
    const user = await User.findOne({
      email,
      resetPasswordTokenVerification: token,
      resetPasswordTokenVerificationExpiresAt: { $gt: new Date() },
    });
    if (!user) {
      return next(new ApiError("Invalid session", StatusCodes.UNAUTHORIZED));
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
  };
}

module.exports = AuthController;
