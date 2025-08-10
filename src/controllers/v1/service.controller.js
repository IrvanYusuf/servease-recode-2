const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Service } = require("@/models/service.model");
const { Review } = require("@/models/review.model");
const redisClient = require("@/config/redis");
const ApiError = require("@/errors/apiError");
class ServiceController {
  static index = async (req, res) => {
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
  };

  static findByCategory = async (req, res) => {
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
  };

  static show = async (req, res, next) => {
    const service_id = req.params.service_id;
    const service = await Service.findOne({ _id: service_id })
      .populate("partner_id")
      .populate("user_id")
      .populate("category_id");

    if (!service) {
      return next(new ApiError("Service not found", StatusCodes.NOT_FOUND));
    }

    return ApiResponse.successResponse(res, "success get service", service);
  };

  static getServiceReview = async (req, res, next) => {
    const service_id = req.params.service_id;
    const service_reviews = await Review.find({ service_id }).populate(
      "user_id"
    );

    if (!service_reviews) {
      return next(
        new ApiError("Review service not found", StatusCodes.NOT_FOUND)
      );
    }

    return ApiResponse.successResponse(
      res,
      "success get review service",
      service_reviews
    );
  };

  static searchServices = async (req, res) => {
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

    return ApiResponse.successResponse(res, "success get search data", payload);
  };

  static getPopularServices = async (req, res) => {
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
  };
}

module.exports = ServiceController;
