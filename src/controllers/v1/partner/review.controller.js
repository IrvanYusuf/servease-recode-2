const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Review } = require("@/models/review.model");
const { Booking } = require("@/models/booking.model");
const { mongoose } = require("mongoose");
class ReviewController {
  static index = async (req, res) => {
    const owner_id = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const service_id = req.query.service_id || "";
    const rating = parseInt(req.query.rating);
    const review_status = req.query.review_status;
    const search = req.query.search || "";

    const matchStage = {
      owner_id: new mongoose.Types.ObjectId(owner_id),
      status: "completed",
    };

    if (service_id) {
      matchStage.service_id = new mongoose.Types.ObjectId(service_id);
    }

    if (review_status) {
      matchStage.review_status = review_status;
    }

    const ratingFilter = !isNaN(rating) ? { "review_id.rating": rating } : {};

    // Fungsi helper untuk cek apakah string adalah valid ObjectId
    const isValidObjectId = (str) => {
      return /^[0-9a-fA-F]{24}$/.test(str);
    };
    const searchFilter = search
      ? [
          {
            $match: {
              $or: [
                { "service_id.name": { $regex: search, $options: "i" } },
                { "partner_id.name": { $regex: search, $options: "i" } },
                { "user_id.name": { $regex: search, $options: "i" } },
                // Perbaikan: Cek jika search adalah valid ObjectId
                ...(isValidObjectId(search)
                  ? [{ _id: new mongoose.Types.ObjectId(search) }]
                  : []),
              ].filter(Boolean), // Remove undefined entries
            },
          },
        ]
      : [];

    // Filter berdasarkan tanggal review (jika diperlukan)
    let reviewDateFilter = {};
    if (req.query.date_from || req.query.date_to) {
      reviewDateFilter = {};
      if (req.query.date_from) {
        reviewDateFilter["review_id.createdAt"] = {
          $gte: new Date(req.query.date_from),
        };
      }
      if (req.query.date_to) {
        const reviewToDate = new Date(req.query.date_to);
        reviewToDate.setHours(23, 59, 59, 999);
        if (!reviewDateFilter["review_id.createdAt"]) {
          reviewDateFilter["review_id.createdAt"] = {};
        }
        reviewDateFilter["review_id.createdAt"].$lte = reviewToDate;
      }
    }

    const pipeline = [
      { $match: matchStage },

      // Join ke collection Review
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "booking_id",
          as: "review_id",
        },
      },
      {
        $unwind: {
          path: "$review_id",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Join ke Service dan Partner (untuk pencarian)
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "_id",
          as: "service_id",
        },
      },
      {
        $unwind: "$service_id",
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
        $unwind: "$partner_id",
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_id",
        },
      },
      {
        $unwind: "$user_id",
      },

      // Filter berdasarkan rating jika ada
      {
        $match: ratingFilter,
      },

      // filter berdasarkan date review from and review to
      {
        $match: reviewDateFilter,
      },

      // search
      ...searchFilter,
      // Sort dan Pagination
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    const bookings = await Booking.aggregate(pipeline);

    // Hitung total tanpa skip-limit
    const totalPipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "booking_id",
          as: "review_id",
        },
      },
      {
        $unwind: {
          path: "$review_id",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: ratingFilter,
      },
      {
        $match: reviewDateFilter,
      },
      ...searchFilter,
      {
        $count: "total",
      },
    ];

    const totalResult = await Booking.aggregate(totalPipeline);
    const total = totalResult[0]?.total || 0;

    const payload = {
      data: bookings,
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
  };

  static getTotalBookingNotReviewed = async (req, res) => {
    const owner_id = req.user.id;
    const totalNotReviewedBooking = await Booking.countDocuments({
      owner_id,
      status: "completed",
      review_status: "not_reviewed",
    });

    return ApiResponse.successResponse(
      res,
      "success get total not reviewed booking partner",
      totalNotReviewedBooking
    );
  };

  static getTotalBookingReview = async (req, res) => {
    const owner_id = req.user.id;
    const totalReviewedBooking = await Booking.countDocuments({
      owner_id,
      status: "completed",
    });

    return ApiResponse.successResponse(
      res,
      "success get total all review booking partner",
      totalReviewedBooking
    );
  };
}

module.exports = ReviewController;
