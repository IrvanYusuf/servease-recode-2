const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Banner } = require("@/models/banner.model");
const uploadToCloudinary = require("@/utils/uploadToCloudinary");
const redisClient = require("@/config/redis");
class BannerController {
  static index = async (req, res) => {
    const cacheKey = "banners";
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log(
        "🍕 Serving data banners from Redis Cache with key:",
        cacheKey
      );
      return ApiResponse.successResponse(
        res,
        "success get datas",
        JSON.parse(cached),
        null,
        StatusCodes.OK
      );
    }
    const banners = await Banner.find().sort({ createdAt: -1 });
    return ApiResponse.successResponse(
      res,
      "success get datas",
      banners,
      null,
      StatusCodes.CREATED
    );
  };

  static store = async (req, res) => {
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
  };
}

module.exports = BannerController;
