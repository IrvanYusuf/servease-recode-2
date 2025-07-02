import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Table from "cli-table3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ambil argumen: path + options
const args = process.argv.slice(2);
const input = args[0]; // v1/auth

if (!input) {
  console.error("❌ Usage: npm run make:route auth or v1/auth");
  process.exit(1);
}

// Jika --help atau -h
if (input === "--help" || input === "-h") {
  console.log(chalk.bold.green("\n🛠  make:route CLI Help\n"));

  console.log(chalk.bold("Usage:"));
  console.log(
    "  " + chalk.cyan("npm run make:route") + " " + chalk.yellow("<path>")
  );
  console.log("");

  console.log(chalk.bold("Examples:"));
  console.log("  " + chalk.cyan("npm run make:route auth"));
  console.log("  " + chalk.cyan("npm run make:route v1/auth"));
  console.log("");

  console.log(chalk.bold("Rules:"));
  console.log("  - Path must end with " + chalk.yellow("'auth'"));
  console.log("  - Will fail if path does not end with 'auth'");
  console.log("");

  const optionTable = new Table({
    head: [chalk.bold("Option"), chalk.bold("Description")],
    colWidths: [20, 60],
  });

  optionTable.push(["--help, -h", "Show this help message"]);

  console.log(chalk.bold("Options:"));
  console.log(optionTable.toString());
  console.log("");

  // Methods table
  const methodsTable = new Table({
    head: [chalk.bold("Generated Methods"), chalk.bold("Description")],
    colWidths: [30, 60],
  });

  const methods = [
    ["login", "User login endpoint"],
    ["register", "User registration"],
    ["logout", "Clear access token"],
    ["verifyOtp", "Verify OTP code"],
    ["changePassword", "Change password using old password"],
    ["forgotPasswordMobile", "Request OTP for mobile reset password"],
    ["forgotPasswordWeb", "Send reset link for web-based password reset"],
    ["verifyForgotPasswordOtp", "Verify OTP sent during forgot password"],
    ["resetPasswordMobile", "Reset password via mobile (with OTP)"],
    ["resetPasswordWeb", "Reset password via web (with token)"],
  ];

  methods.forEach((method) => methodsTable.push(method));

  console.log(chalk.bold("Output Methods:"));
  console.log(methodsTable.toString());
  console.log("");

  process.exit(0);
}

// const lastSegment = input.split("/").pop();
const parts = input.split("/");
const rawName = parts.pop(); // User
const dirPath = parts.join("/");

if (rawName !== "auth") {
  console.error("❌ Auth name must end with 'auth'");
  process.exit(1);
}

const kebabName = rawName.toLowerCase();
const controllerFileName = `${kebabName}.controller.js`;
const routeFileName = `${kebabName}.route.js`;

const controllerName = `${
  rawName.charAt(0).toUpperCase() + rawName.slice(1)
}Controller`;

const controllerPath = path.resolve(__dirname, "../src/controllers", dirPath);
const routePath = path.resolve(__dirname, "../src/routes", dirPath);
const filePath = path.join(controllerPath, controllerFileName);

const indexFilePath = path.join(routePath, "index.js");

// route
const routePathRoutes = path.resolve(__dirname, "../src/routes", dirPath);
const filePathRoute = path.join(routePathRoutes, routeFileName);
const routePathRoute = path.resolve(__dirname, "../src/routes", dirPath);
const indexRoutePath = path.join(routePathRoute, "index.js");
// Template isi auth
const content = `import { User } from "@/models/user.model";
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
      console.error(\`[${new Date().toISOString()}]\`, error);
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
     console.error(\`[${new Date().toISOString()}]\`, error);
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
      console.error(\`[${new Date().toISOString()}]\`, error);
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
      console.error(\`[${new Date().toISOString()}]\`, error);
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
      console.error(\`[${new Date().toISOString()}]\`, error);
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
      console.log(\`OTP sent to \${email}: \${otp}\`);

      return ApiResponse.successResponse(res, "OTP sent to your email");
    } catch (error) {
      console.error(\`[${new Date().toISOString()}]\`, error);
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
      console.log(\`OTP sent to \${email}: \${otp}\`);

      return ApiResponse.successResponse(
        res,
        "Reset link password sent to your email"
      );
    } catch (error) {
      console.error(\`[${new Date().toISOString()}]\`, error);
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
      console.error(\`[${new Date().toISOString()}]\`, error);
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
      console.error(\`[${new Date().toISOString()}]\`, error);
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
      console.error(\`[${new Date().toISOString()}]\`, error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

export default AuthController;
`;

// Buat folder controller baru jika belum ada
fs.mkdirSync(routePath, { recursive: true });

// Buat folder route baru jika belum ada
fs.mkdirSync(controllerPath, { recursive: true });

// Cegah overwrite
if (fs.existsSync(filePath)) {
  console.error(
    `❌ Auth already exists at: src/controllers/${dirPath}/${controllerFileName}`
  );
  process.exit(1);
}

fs.writeFileSync(filePath, content);

let contentRoute = `import express from "express";
import AuthController from "@/controllers/${input}.controller.js";
import authMiddleware from "@/middlewares/auth.middleware";
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

export default router;
`;
// route cli generate config
if (fs.existsSync(filePathRoute)) {
  console.error(
    `❌ Route already exists at: src/routes/${dirPath}/${routeFileName}`
  );
  process.exit(1);
}
fs.writeFileSync(filePathRoute, contentRoute);

// buat file route sekalian
let indexContent = "";

if (input === "auth" && fs.existsSync(indexRoutePath)) {
  indexContent = fs.readFileSync(indexRoutePath, "utf-8");
  const importLine = `import ${kebabName}Routes from "./${routeFileName}";`;
  const useLine = `router.use("/${kebabName}s", ${kebabName}Routes);`;

  if (!indexContent.includes(importLine)) {
    const lines = indexContent.split("\n");

    // Sisipkan import setelah express
    const expressIndex = lines.findIndex((line) =>
      line.startsWith("import express")
    );
    lines.splice(expressIndex + 1, 0, importLine);

    // Tambahkan router.use sebelum export
    const exportIndex = lines.findIndex((line) =>
      line.includes("export default router")
    );
    lines.splice(exportIndex, 0, useLine);

    fs.writeFileSync(indexRoutePath, lines.join("\n"));
    console.log(`✅ Route registered in: src/routes/${dirPath}/index.js`);
  }
}

if (!fs.existsSync(indexRoutePath)) {
  // Jika index.js belum ada, buat baru
  indexContent = `import express from "express";
import ${kebabName}Routes from "./${routeFileName}";

const router = express.Router();

router.use("/${kebabName}s", ${kebabName}Routes);

export default router;
`;
  fs.writeFileSync(indexRoutePath, indexContent);
  //   console.log(`✅ index.js created at: src/routes/${dirPath}/index.js`);
  const globalIndexRoutePath = path.resolve(
    __dirname,
    "../src/routes/index.js"
  );
  const relativeToGlobal = `./${dirPath}`; // e.g. ./v1
  const camelName = `api${dirPath
    .split("/")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}Routes`; // contoh: apiV2Routes

  const importGlobalLine = `import ${camelName} from "${relativeToGlobal}";`;
  const useGlobalLine = `router.use("/${dirPath}", ${camelName});`;

  if (fs.existsSync(globalIndexRoutePath)) {
    let globalIndexContent = fs.readFileSync(globalIndexRoutePath, "utf-8");

    if (!globalIndexContent.includes(importGlobalLine)) {
      const globalLines = globalIndexContent.split("\n");

      const globalExpressIndex = globalLines.findIndex((line) =>
        line.startsWith("import express")
      );
      globalLines.splice(globalExpressIndex + 1, 0, importGlobalLine);

      const globalExportIndex = globalLines.findIndex((line) =>
        line.includes("export default router")
      );
      globalLines.splice(globalExportIndex, 0, useGlobalLine);

      fs.writeFileSync(globalIndexRoutePath, globalLines.join("\n"));
      console.log("✅ Registered v1 route to: src/routes/index.js");
    } else {
      console.log("ℹ️  Route already registered in src/routes/index.js");
    }
  } else {
    // Buat global index.js jika belum ada
    const camelName = `api${dirPath
      .split("/")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")}Routes`; // contoh: apiV2Routes

    const globalIndexContent = `import express from "express";
import ${camelName} from "${relativeToGlobal}Routes from "router.use("/${dirPath}", ${camelName})";

const router = express.Router();

router.use("/${dirPath}", ${dirPath.replace("/", "_")}Routes);

export default router;
`;
    fs.writeFileSync(globalIndexRoutePath, globalIndexContent);
    console.log("✅ Created src/routes/index.js and registered v1 route");
  }
} else {
  indexContent = fs.readFileSync(indexRoutePath, "utf-8");
  const importLine = `import ${kebabName}Routes from "./${routeFileName}";`;
  const useLine = `router.use("/${kebabName}s", ${kebabName}Routes);`;

  if (!indexContent.includes(importLine)) {
    const lines = indexContent.split("\n");

    // Sisipkan import setelah express
    const expressIndex = lines.findIndex((line) =>
      line.startsWith("import express")
    );
    lines.splice(expressIndex + 1, 0, importLine);

    // Tambahkan router.use sebelum export
    const exportIndex = lines.findIndex((line) =>
      line.includes("export default router")
    );
    lines.splice(exportIndex, 0, useLine);

    fs.writeFileSync(indexRoutePath, lines.join("\n"));
    console.log(`✅ Route registered in: src/routes/${dirPath}/index.js`);
  }
}
