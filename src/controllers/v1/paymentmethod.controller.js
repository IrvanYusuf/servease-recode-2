const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const {
  createPaymentMethodSchema,
} = require("@/validation/paymentMethod.validation");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
const { PaymentMethod } = require("@/models/paymentMethod.model");
class PaymentMethodController {
  static index = async (req, res) => {
    const data = await PaymentMethod.find();
    return ApiResponse.successResponse(
      res,
      "success get datas",
      data,
      null,
      StatusCodes.OK
    );
  };

  static store = async (req, res) => {
    const data = req.validated;

    let bankLogoUrl = null;
    if (data.type === "bank_transfer") {
      if (!req?.file?.buffer) {
        return ApiResponse.errorResponse(
          res,
          "Bank logo file is required",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      bankLogoUrl = await uploadToCloudinary({
        buffer: req.file.buffer,
      });
    }

    const paymentMethodCreate = await PaymentMethod.create({
      name: data.name,
      type: data.type,
      description: data.description,
      bank_name: data.bank_name,
      bank_logo: bankLogoUrl,
      account_holder: data.account_holder,
      account_number: data.account_number,
    });

    return ApiResponse.successResponse(
      res,
      "success create payment method",
      paymentMethodCreate,
      null,
      StatusCodes.CREATED
    );
  };
}

module.exports = PaymentMethodController;
