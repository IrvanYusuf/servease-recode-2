const ApiResponse = require("@/utils/response");
const { StatusCodes } = require("http-status-codes");
const { ValidationError } = require("joi");
const ApiError = require("./apiError");

const errorHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ValidationError) {
    return ApiResponse.errorResponse(
      res,
      "Validation failed",
      err.details.map((e) => ({
        field: e.context.key,
        message: e.message,
      })),
      StatusCodes.BAD_REQUEST
    );
  }

  if (err instanceof ApiError) {
    return ApiResponse.errorResponse(res, err.message, null, err.statusCode);
  }

  return ApiResponse.errorResponse(
    res,
    err.message || "Internal server error",
    err.details,
    null
  );
};

module.exports = errorHandler;
