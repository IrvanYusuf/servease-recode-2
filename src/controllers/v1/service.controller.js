const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { createServiceSchema } = require("@/validation/service.validation");
const {
  uploadMultipleToCloudinary,
  uploadToCloudinary,
} = require("@/utils/uploadToCloudinary");
const { Service } = require("@/models/service.model");
const { Review } = require("@/models/review.model");
class ServiceController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;

      const services = await Service.find({ user_id })
        .populate("partner_id")
        .populate("category_id");

      return ApiResponse.successResponse(
        res,
        "success get datas",
        services,
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
      const body = req.body;
      const result = createServiceSchema.validate(body, { abortEarly: false });
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

      const data = result.value;

      const thumbnailFile = req.files["thumbnail"]?.[0];
      const galleryImages = req.files["gallery_images"] || [];
      const thumbnailUrl = await uploadToCloudinary({
        buffer: thumbnailFile.buffer,
      });

      const galleryImageUrls = await uploadMultipleToCloudinary(galleryImages);
      const user_id = req.user.id;

      const service = await Service.create({
        partner_id: data.partner_id,
        category_id: data.category_id,
        name: data.name,
        price: data.price,
        thumbnail: thumbnailUrl,
        gallery_images: galleryImageUrls,
        description: data.description,
        user_id,
      });

      return ApiResponse.successResponse(
        res,
        "success create service",
        service,
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

  static findByCategory = async (req, res) => {
    try {
      const category_id = req.params.category_id;

      const services = await Service.find({ category_id }).populate(
        "partner_id"
      );

      return ApiResponse.successResponse(
        res,
        "success get datas",
        services,
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

  static show = async (req, res) => {
    try {
      const service_id = req.params.service_id;
      const service = await Service.findOne({ _id: service_id })
        .populate("partner_id")
        .populate("user_id")
        .populate("category_id");

      if (!service) {
        return ApiResponse.errorResponse(
          res,
          "Service not found",
          { data: "Service not found" },
          StatusCodes.NOT_FOUND
        );
      }

      return ApiResponse.successResponse(res, "success get service", service);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static getServiceReview = async (req, res) => {
    try {
      const service_id = req.params.service_id;
      const service_reviews = await Review.findOne({ service_id }).populate(
        "user_id"
      );

      if (!service_reviews) {
        return ApiResponse.errorResponse(
          res,
          "Review service not found",
          { data: "Review service not found" },
          StatusCodes.NOT_FOUND
        );
      }

      return ApiResponse.successResponse(
        res,
        "success get review service",
        service_reviews
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

module.exports = ServiceController;
