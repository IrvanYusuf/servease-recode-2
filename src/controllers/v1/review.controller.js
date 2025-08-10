const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const {
  createReviewSchema,
  updateReviewSchema,
} = require("@/validation/review.validation");
const { Review } = require("@/models/review.model");
const { Booking } = require("@/models/booking.model");
const { Service } = require("@/models/service.model");
const ApiError = require("@/errors/apiError");
class ReviewController {
  static index = async (req, res) => {
    const user_id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filter = { user_id };
    const total = await Review.countDocuments(filter);
    const reviews = await Review.find(filter)
      .populate({
        path: "service_id",
        populate: {
          path: "category_id",
          model: "Category",
        },
      })
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

    // LOGIC APP
    return ApiResponse.successResponse(res, "success get reviews", payload);
  };

  static store = async (req, res) => {
    const { booking_id } = req.params;
    const user_id = req.user.id;

    const data = req.validated;

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

    // Hitung total rating dan review untuk service terkait
    const allReviews = await Review.find({ service_id: data.service_id });

    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const totalReviews = allReviews.length;
    const averageRating = totalRating / totalReviews;

    // Update rating dan total_reviews di Service
    await Service.findByIdAndUpdate(data.service_id, {
      rating: averageRating.toFixed(1), // jika ingin 1 angka desimal
      total_reviews: totalReviews,
    });

    // LOGIC APP
    return ApiResponse.successResponse(
      res,
      "success create review",
      createReview,
      null,
      StatusCodes.CREATED
    );
  };

  static update = async (req, res) => {
    const { review_id } = req.params;
    const data = req.validated;

    // Cek apakah review exists
    const existingReview = await Review.findById(review_id);
    if (!existingReview) {
      return ApiResponse.errorResponse(res, "Review not found", null, 404);
    }

    const review = await Review.findByIdAndUpdate(review_id, data, {
      runValidators: true,
      new: true,
    });

    // Hitung total rating dan review untuk service terkait
    const allReviews = await Review.find({
      service_id: existingReview.service_id,
    });

    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const totalReviews = allReviews.length;
    const averageRating = totalRating / totalReviews;

    // Update rating dan total_reviews di Service
    await Service.findByIdAndUpdate(existingReview.service_id, {
      rating: averageRating.toFixed(1), // jika ingin 1 angka desimal
      total_reviews: totalReviews,
    });

    return ApiResponse.successResponse(
      res,
      "Review updated successfully",
      review
    );
  };

  static destroy = async (req, res, next) => {
    const { review_id } = req.params;

    // Cek apakah review exists
    const review = await Review.findById(review_id);
    if (!review) {
      return next(new ApiError("Review not found", StatusCodes.NOT_FOUND));
    }

    // Store service_id before deletion
    const serviceId = review.service_id;

    // Delete review
    await Review.findByIdAndDelete(review_id);

    // Hitung total rating dan review untuk service terkait
    const allReviews = await Review.find({
      service_id: serviceId,
    });

    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const totalReviews = allReviews.length;
    const averageRating = totalRating / totalReviews;

    // Update rating dan total_reviews di Service
    await Service.findByIdAndUpdate(serviceId, {
      rating: averageRating.toFixed(1), // jika ingin 1 angka desimal
      total_reviews: totalReviews,
    });

    return ApiResponse.successResponse(res, "Review deleted successfully", {
      deletedReview: review,
      updatedStats: {
        totalReviews,
        averageRating:
          totalReviews === 0 ? 0 : Number(averageRating.toFixed(1)),
      },
    });
  };

  static getTotalReviewed = async (req, res) => {
    const user_id = req.user.id;
    const totalReviewedUser = await Review.countDocuments({
      user_id,
    });

    return ApiResponse.successResponse(
      res,
      "success get total reviewed booking",
      totalReviewedUser
    );
  };
}

module.exports = ReviewController;
