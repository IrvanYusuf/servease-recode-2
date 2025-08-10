"use strict";

var jwt = require("jsonwebtoken");
var ApiResponse = require("../utils/response.js");
var _require = require("../config/index.js"),
  CONFIG = _require.CONFIG;
var _require2 = require("http-status-codes"),
  StatusCodes = _require2.StatusCodes;
var authMiddleware = function authMiddleware(req, res, next) {
  var authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  if (!token) {
    return ApiResponse.errorResponse(res, "Unauthorized", {
      auth: "No token provided"
    }, StatusCodes.UNAUTHORIZED);
  }
  try {
    var decoded = jwt.verify(token, CONFIG.JWT_SECRET_KEY);
    req.user = decoded; // simpan payload decoded token ke req.user
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    return ApiResponse.errorResponse(res, "Forbidden or expired token", {
      auth: err.message
    }, StatusCodes.FORBIDDEN);
  }
};
module.exports = authMiddleware;