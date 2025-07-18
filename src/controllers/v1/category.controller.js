const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const uploadToCloudinary = require("@/utils/uploadToCloudinary");
const { Category } = require("@/models/category.model");
class CategoryController {
  static index = async (req, res) => {
    try {
      const categories = await Category.find();
      return ApiResponse.successResponse(
        res,
        "success get datas",
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
