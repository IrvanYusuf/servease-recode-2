import { StatusCodes } from "http-status-codes";

class ApiResponse {
  /**
   * Sends a standardized success response to the client.
   *
   * @function
   * @static
   * @param {import('express').Response} res - Express response object.
   * @param {string} message - Success message to return to the client.
   * @param {any} [data=null] - The data payload to return (object, array, etc.).
   * @param {any} [errors=null] - Optional error information, even in success cases.
   * @param {number} [statusCode=200] - HTTP status code (default is 200).
   * @returns {import('express').Response} JSON response sent to the client.
   */
  static successResponse = (
    res,
    message,
    data = null,
    errors = null,
    statusCode = StatusCodes.OK
  ) => {
    return res.status(statusCode).json({
      message,
      data,
      errors,
    });
  };

  /**
   * Sends a standardized error response to the client.
   *
   * @function
   * @static
   * @param {import('express').Response} res - Express response object.
   * @param {string} message - Success message to return to the client.
   * @param {any} [data=null] - The data payload to return (object, array, etc.).
   * @param {any} [errors=null] - Optional error information, even in success cases.
   * @param {number} [statusCode=500] - HTTP status code (default is 500).
   * @returns {import('express').Response} JSON response sent to the client.
   */
  static errorResponse = (
    res,
    message = "Internal server error",
    errors = null,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    data = null
  ) => {
    return res.status(statusCode).json({
      message,
      data,
      errors,
    });
  };
}

export default ApiResponse;
