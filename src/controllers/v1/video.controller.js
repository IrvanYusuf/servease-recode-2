const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Video } = require("@/models/video.model");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
const redisClient = require("@/config/redis");
class VideoController {
  static index = async (req, res) => {
    try {
      const cacheKey = "video-tutorials";
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log(
          "🍕 Serving data video tutorials from Redis with key:",
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
      const videos = await Video.find();
      await redisClient.setEx(cacheKey, 18000, JSON.stringify(videos)); // 1 jam
      return ApiResponse.successResponse(
        res,
        "success get datas",
        videos,
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
      if (!req.file) {
        return ApiResponse.errorResponse(
          res,
          "File thumbnail wajib diupload",
          {},
          StatusCodes.BAD_REQUEST
        );
      }

      const thumbnailUrl = await uploadToCloudinary({
        buffer: req.file.buffer,
      });

      const video = await Video.create({
        name: req.body.name,
        url_thumbnail: thumbnailUrl,
        url_video: req.body.url_video,
      });
      return ApiResponse.successResponse(
        res,
        "success create video",
        video,
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

module.exports = VideoController;
