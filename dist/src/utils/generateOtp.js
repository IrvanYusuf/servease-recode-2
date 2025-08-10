"use strict";

var _require = require("../constant/constant.js"),
  LENGTH_OTP = _require.LENGTH_OTP;
var otpGenerator = require("otp-generator");
var generateOtp = function generateOtp() {
  var otp = otpGenerator.generate(LENGTH_OTP, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false
  });
  return otp;
};
module.exports = generateOtp;