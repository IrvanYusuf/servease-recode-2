const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Address } = require("@/models/address.model");
const ApiError = require("@/errors/apiError");
class AddressController {
  static index = async (req, res, next) => {
    const user_id = req.user.id;
    const addresses = await Address.find({ user_id }).sort({
      isPrimary: -1,
    });
    return ApiResponse.successResponse(res, "success get addresses", addresses);
  };

  static getPrimaryAddress = async (req, res, next) => {
    const user_id = req.user.id;

    const address = await Address.findOne({ user_id, isPrimary: true });
    if (!address) {
      return next(new ApiError("Address not found", StatusCodes.NOT_FOUND));
    }
    return ApiResponse.successResponse(
      res,
      "success get primary address",
      address
    );
  };

  static store = async (req, res) => {
    const data = req.validated;

    const user_id = req.user.id;

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
  };

  static update = async (req, res, next) => {
    const { address_id } = req.params;
    const data = req.validated;
    const address = await Address.findByIdAndUpdate(address_id, data, {
      runValidators: true,
      new: true,
    });

    if (!address) {
      return next(new ApiError("Address not found", StatusCodes.NOT_FOUND));
    }

    return ApiResponse.successResponse(
      res,
      "update address successfully",
      address
    );
  };

  static setPrimary = async (req, res, next) => {
    const { address_id } = req.params;
    const user_id = req.user.id;

    // Pastikan alamat memang milik user
    const address = await Address.findOne({ _id: address_id, user_id });
    if (!address) {
      return next(new ApiError("Address not found", StatusCodes.NOT_FOUND));
    }
    // Set semua alamat user jadi non-primary
    await Address.updateMany({ user_id }, { isPrimary: false });

    // Set alamat yang dipilih jadi primary
    await Address.findByIdAndUpdate(address_id, { isPrimary: true });

    return ApiResponse.successResponse(res, "Success set address as primary");
  };

  static destroy = async (req, res) => {
    const { address_id } = req.params;
    const user_id = req.user.id;

    await Address.deleteOne({ _id: address_id, user_id });
    return ApiResponse.successResponse(res, "Success delete address");
  };
}

module.exports = AddressController;
