const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Review } = require("@/models/review.model");
class ReviewController {
  static index = async (req, res) => {
    try {
      const owner_id = req.user.id;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const service_id = req.query.service_id || "";
      const rating = parseInt(req.query.rating);
      const search = req.query.search || "";
      const filter = { owner_id };

      if (service_id) {
        filter.service_id = service_id;
      }

      if (!isNaN(rating)) {
        filter.rating = rating;
      }

      if (search) {
        filter.$or = [
          { "service_id.name": { $regex: search, $options: "i" } },
          { "partner_id.name": { $regex: search, $options: "i" } },
        ];
      }

      const total = await Review.countDocuments(filter);
      const reviews = await Review.find(filter)
        .populate({
          path: "service_id",
          populate: {
            path: "category_id",
            model: "Category",
          },
        })
        .populate("user_id")
        .populate("booking_id")
        .populate("partner_id")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const payload = {
        data: reviews,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
      return ApiResponse.successResponse(
        res,
        "success get reviews partner",
        payload
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

module.exports = ReviewController;
