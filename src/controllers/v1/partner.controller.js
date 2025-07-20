const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
const { createCompanySchema } = require("@/validation/company.validation");
const { Partner } = require("@/models/partner.model");
class PartnerController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;
      const partners = await Partner.find({ user_id });
      return ApiResponse.successResponse(
        res,
        "success get datas",
        partners,
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
      const result = createCompanySchema.validate(body, {
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
      const imageUrl = await uploadToCloudinary({ buffer: req.file.buffer });

      const data = result.value;
      const user = req.user;

      const partner = await Partner.create({
        user_id: user.id,
        city: data.city,
        name: data.name,
        province: data.province,
        district: data.district,
        profile_image: imageUrl,
        description: data.description,
        link_map: data.link_map,
      });

      return ApiResponse.successResponse(
        res,
        "success create partner",
        partner,
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

module.exports = PartnerController;
