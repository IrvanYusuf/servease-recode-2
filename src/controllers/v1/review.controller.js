const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { createReviewSchema } = require("@/validation/review.validation");
const { Review } = require("@/models/review.model");
const { Booking } = require("@/models/booking.model");
const { Service } = require("@/models/service.model");
class ReviewController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;
      const reviews = await Review.find({ user_id })
        .populate({
          path: "service_id",
          populate: {
            path: "category_id",
            model: "Category",
          },
        })
        .populate("booking_id")
        .populate("partner_id")
        .sort({ createdAt: -1 });

      // LOGIC APP
      return ApiResponse.successResponse(res, "success get reviews", reviews);
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
      const { booking_id } = req.params;
      const user_id = req.user.id;
      const result = createReviewSchema.validate(body, { abortEarly: false });
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

      const createReview = await Review.create({
        user_id,
        booking_id,
        partner_id: data.partner_id,
        service_id: data.service_id,
        owner_id: data.owner_id,
        rating: data.rating,
        comment: data.comment,
      });

      const updateStatusReview = await Booking.findOneAndUpdate(
        { _id: booking_id, user_id },
        { review_status: "reviewed" }
      );

      // LOGIC APP
      return ApiResponse.successResponse(
        res,
        "success create review",
        createReview,
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

module.exports = ReviewController;
