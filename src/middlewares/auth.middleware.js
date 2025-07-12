const jwt = require("jsonwebtoken");
const ApiResponse = require("@/utils/response.js");
const { CONFIG } = require("../config/index.js");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  if (!token) {
    return ApiResponse.errorResponse(
      res,
      "Unauthorized",
      { auth: "No token provided" },
      StatusCodes.UNAUTHORIZED
    );
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET_KEY);
    req.user = decoded; // simpan payload token ke req.user
    next();
  } catch (err) {
    return ApiResponse.errorResponse(
      res,
      "Forbidden or expired token",
      { auth: err.message },
      StatusCodes.FORBIDDEN
    );
  }
};

module.exports = authMiddleware;
