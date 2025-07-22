const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const {
  createPaymentMethodSchema,
} = require("@/validation/paymentMethod.validation");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
const { PaymentMethod } = require("@/models/paymentMethod.model");
class PaymentMethodController {
  static index = async (req, res) => {
    try {
      const data = await PaymentMethod.find();
      return ApiResponse.successResponse(
        res,
        "success get datas",
        data,
        null,
        StatusCodes.OK
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static store = async (req, res) => {
    try {
      const body = req.body;
      const result = createPaymentMethodSchema.validate(body, {
        abortEarly: false,
      });
      if (result.error) {
        const errors = result.error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        }));

        return ApiResponse.errorResponse(
          res,
          "Validation failed",
          errors,
          StatusCodes.BAD_REQUEST
        );
      }
      const data = result.value;

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
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

module.exports = PaymentMethodController;
