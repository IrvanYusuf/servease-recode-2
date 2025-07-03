// import { LENGTH_OTP } from "@/constant/constant";
const { LENGTH_OTP } = require("@/constant/constant.js");
const otpGenerator = require("otp-generator");

const generateOtp = () => {
  const otp = otpGenerator.generate(LENGTH_OTP, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });

  return otp;
};

module.exports = generateOtp;
