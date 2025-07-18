const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Banner } = require("@/models/banner.model");
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
      const { url_image } = req.body;
      if (!url_image) {
        return ApiResponse.errorResponse(
          res,
          "url_image is required",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const banner = new Banner({ url_image });
      await banner.save();

      return ApiResponse.successResponse(
        res,
        "Banner created successfully",
        banner,
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
