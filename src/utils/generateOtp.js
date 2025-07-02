import { LENGTH_OTP } from "@/constant/constant";
import otpGenerator from "otp-generator";

export const generateOtp = () => {
  const otp = otpGenerator.generate(LENGTH_OTP, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });

  return otp;
};
