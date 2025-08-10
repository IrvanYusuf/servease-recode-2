"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("http-status-codes"),
  StatusCodes = _require.StatusCodes;
var ApiResponse = /*#__PURE__*/_createClass(function ApiResponse() {
  _classCallCheck(this, ApiResponse);
});
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
_defineProperty(ApiResponse, "successResponse", function (res, message) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var errors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var statusCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : StatusCodes.OK;
  return res.status(statusCode).json({
    message: message,
    data: data,
    errors: errors
  });
});
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
_defineProperty(ApiResponse, "errorResponse", function (res) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Internal server error";
  var errors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var statusCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : StatusCodes.INTERNAL_SERVER_ERROR;
  var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  return res.status(statusCode).json({
    message: message,
    data: data,
    errors: errors
  });
});
module.exports = ApiResponse;