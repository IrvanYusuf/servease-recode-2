"use strict";

var ApiResponse = require("../utils/response");
var _require = require("http-status-codes"),
  StatusCodes = _require.StatusCodes;
var _require2 = require("joi"),
  ValidationError = _require2.ValidationError;
var ApiError = require("./apiError");
var errorHandler = function errorHandler(err, req, res, next) {
  if (!err) {
    next();
    return;
  }
  if (err instanceof ValidationError) {
    return ApiResponse.errorResponse(res, "Validation failed", err.details.map(function (e) {
      return {
        field: e.context.key,
        message: e.message
      };
    }), StatusCodes.BAD_REQUEST);
  }
  if (err instanceof ApiError) {
    return ApiResponse.errorResponse(res, err.message, null, err.statusCode);
  }
  return ApiResponse.errorResponse(res, err.message || "Internal server error", err.details, null);
};
module.exports = errorHandler;