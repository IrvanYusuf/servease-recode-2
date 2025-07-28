const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { createServiceSchema } = require("@/validation/service.validation");
const {
  uploadMultipleToCloudinary,
  uploadToCloudinary,
} = require("@/utils/uploadToCloudinary");
const { Service } = require("@/models/service.model");
const { Review } = require("@/models/review.model");
const redisClient = require("@/config/redis");
const { json } = require("express");
class ServiceController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filter = { user_id };
      const total = await Service.countDocuments(filter);

      const services = await Service.find(filter)
        .populate("partner_id")
        .populate("category_id")
        .skip((page - 1) * limit)
        .limit(limit);

      const payload = {
        data: services,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      return ApiResponse.successResponse(res, "success get datas", payload);
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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filter = { category_id };
      const total = await Service.countDocuments(filter);

      const services = await Service.find(filter)
        .populate("partner_id")
        .populate("category_id")
        .skip((page - 1) * limit)
        .limit(limit);

      const payload = {
        data: services,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      return ApiResponse.successResponse(res, "success get datas", payload);
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
      const service_reviews = await Review.find({ service_id }).populate(
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

  static searchServices = async (req, res) => {
    try {
      const { keyword = "", page = 1, limit = 10 } = req.query;
      const regex = new RegExp(keyword, "i"); // case-insensitive
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const pipeline = [
        {
          $lookup: {
            from: "categories", // nama collection Category
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "partners",
            localField: "partner_id",
            foreignField: "_id",
            as: "partner_id",
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $unwind: { path: "$partner_id", preserveNullAndEmptyArrays: true } },
        {
          $match: {
            $or: [
              { name: { $regex: regex } },
              { "category.name": { $regex: regex } },
            ],
          },
        },
        {
          $facet: {
            data: [{ $skip: skip }, { $limit: parseInt(limit) }],
            totalCount: [{ $count: "count" }],
          },
        },
      ];

      const result = await Service.aggregate(pipeline);
      const data = result[0]?.data || [];
      const total = result[0]?.totalCount[0]?.count || 0;

      const payload = {
        data,
        pagination: {
          total,
          page: parseInt(page),
          limit,
          totalPages: Math.ceil(total / limit),
          keyword,
        },
      };

      return ApiResponse.successResponse(
        res,
        "success get search data",
        payload
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static getPopularServices = async (req, res) => {
    try {
      const cacheKey = "popular_services";
      const cached = await redisClient.get(cacheKey);
      const limit = parseInt(req.query.limit) || 10;
      if (cached) {
        console.log(
          "🍕 Serving data popular services from Redis Cache with key:",
          cacheKey
        );
        return ApiResponse.successResponse(
          res,
          "success get datas",
          JSON.parse(cached)
        );
      }
      // Ambil ID acak
      const randomDocs = await Service.aggregate([
        { $sample: { size: limit } },
        { $project: { _id: 1 } },
      ]);

      const randomIds = randomDocs.map((doc) => doc._id);
      const services = await Service.find({ _id: { $in: randomIds } })
        .populate("partner_id")
        .populate("category_id");

      await redisClient.setEx(cacheKey, 1800, JSON.stringify(services));

      return ApiResponse.successResponse(
        res,
        "success get popular services",
        services
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
