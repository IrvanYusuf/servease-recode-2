const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
const { Category } = require("@/models/category.model");
const redisClient = require("@/config/redis");
const ApiError = require("@/errors/apiError");
class CategoryController {
  static index = async (req, res) => {
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
  };

  // store
  static store = async (req, res) => {
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
  };

  static show = async (req, res, next) => {
    const { category_id } = req.params;
    const category = await Category.findById(category_id);
    if (!category) {
      return next(new ApiError("Category not found", StatusCodes.NOT_FOUND));
    }
    return ApiResponse.successResponse(
      res,
      "success get detail category",
      category
    );
  };
}

module.exports = CategoryController;
