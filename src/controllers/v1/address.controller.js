const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { createAddressSchema } = require("@/validation/address.validation");
const { Address } = require("@/models/address.model");
class AddressController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;
      const addresses = await Address.find({ user_id }).sort({
        isPrimary: -1,
      });
      return ApiResponse.successResponse(
        res,
        "success get addresses",
        addresses,
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

  static getPrimaryAddress = async (req, res) => {
    try {
      const user_id = req.user.id;

      const address = await Address.findOne({ user_id, isPrimary: true });
      return ApiResponse.successResponse(
        res,
        "success get primary address",
        address
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
      const result = createAddressSchema.validate(body, { abortEarly: false });

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

      const user_id = req.user.id;
      const data = result.value;
      const address = await Address.create({
        user_id,
        city: data.city,
        district: data.district,
        label_alamat: data.label_alamat,
        phone: data.phone,
        province: data.province,
        street_name: data.street_name,
        description: data.description,
      });
      return ApiResponse.successResponse(
        res,
        "success create address",
        address,
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

  static setPrimary = async (req, res) => {
    try {
      const { address_id } = req.params;
      const user_id = req.user.id;

      // Set semua alamat user jadi non-primary
      await Address.updateMany({ user_id }, { isPrimary: false });

      // Set alamat yang dipilih jadi primary
      await Address.findByIdAndUpdate(address_id, { isPrimary: true });

      return ApiResponse.successResponse(res, "Success set address as primary");
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static destroy = async (req, res) => {
    try {
      const { address_id } = req.params;
      const user_id = req.user.id;

      await Address.deleteOne({ _id: address_id, user_id });
      return ApiResponse.successResponse(res, "Success delete address");
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

module.exports = AddressController;
