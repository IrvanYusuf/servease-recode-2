import jwt from "jsonwebtoken";
import ApiResponse from "@/utils/response";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  if (!token) {
    return ApiResponse.errorResponse(
      res,
      "Unauthorized",
      { auth: "No token provided" },
      401
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // simpan payload token ke req.user
    next();
  } catch (err) {
    return ApiResponse.errorResponse(
      res,
      "Forbidden or expired token",
      { auth: err.message },
      403
    );
  }
};

export default authMiddleware;
