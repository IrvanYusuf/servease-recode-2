const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Banner } = require("@/models/banner.model");
const uploadToCloudinary = require("@/utils/uploadToCloudinary");
class BannerController {
  static index = async (req, res) => {
    try {
      const banners = await Banner.find().sort({ createdAt: -1 });
      return ApiResponse.successResponse(
        res,
        "success get datas",
        banners,
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

  static store = async (req, res) => {
    try {
      // validasi ada file
      if (!req.file) {
        return ApiResponse.errorResponse(
          res,
          "File gambar wajib diupload",
          {},
          StatusCodes.BAD_REQUEST
        );
      }

      const imageUrl = await uploadToCloudinary({ buffer: req.file.buffer });

      const create = await Banner.create({
        url_image: imageUrl,
      });

      return ApiResponse.successResponse(
        res,
        "create banner successfully",
        create,
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

module.exports = BannerController;
