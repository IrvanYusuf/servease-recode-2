const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
const { Category } = require("@/models/category.model");
const redisClient = require("@/config/redis");
class CategoryController {
  static index = async (req, res) => {
    try {
      const cacheKey = "categories";
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log(
          "🍕 Serving data categories from Redis Cache with key:",
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
      const categories = await Category.find();
      await redisClient.setEx(cacheKey, 18000, JSON.stringify(categories)); // 1 jam
      return ApiResponse.successResponse(
        res,
        "success get categories",
        categories,
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

  // store
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

      const create = await Category.create({
        name: req.body.name,
        url_icon: imageUrl,
      });

      return ApiResponse.successResponse(
        res,
        "Kategori berhasil dibuat",
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

module.exports = CategoryController;
