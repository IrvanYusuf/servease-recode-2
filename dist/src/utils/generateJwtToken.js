"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var jwt = require("jsonwebtoken");
var _require = require("../config/index.js"),
  CONFIG = _require.CONFIG;

/**
 * Generate a JWT token.
 * - Jika `originalToken` disertakan, maka token baru akan dibuat dengan `exp` dari token tersebut.
 * - Jika tidak, maka gunakan `expiredToken` default.
 *
 * @param {Object} payload - Data untuk dimasukkan ke dalam token.
 * @param {string} [expiredToken="7d"] - Waktu kedaluwarsa token, jika `originalToken` tidak disediakan.
 * @param {string|null} [originalToken=null] - Token lama untuk mengambil `exp` yang sudah ditentukan.
 * @returns {string} - Token JWT baru.
 */
var generateJwtToken = function generateJwtToken(payload) {
  var expiredToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "7d";
  var originalToken = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // Jika token lama diberikan dan ingin mempertahankan exp lama
  if (originalToken) {
    var decoded = jwt.decode(originalToken);
    if (!decoded || !decoded.exp) {
      throw new Error("Original token tidak valid atau tidak memiliki exp");
    }

    // Buat token baru dengan exp dari token lama
    return jwt.sign(_objectSpread(_objectSpread({}, payload), {}, {
      exp: decoded.exp
    }), CONFIG.JWT_SECRET_KEY, {
      noTimestamp: true
    } // tidak buat iat baru
    );
  }

  // Default: buat token dengan expiredToken baru
  return jwt.sign(payload, CONFIG.JWT_SECRET_KEY, {
    expiresIn: expiredToken
  });
};
module.exports = generateJwtToken;