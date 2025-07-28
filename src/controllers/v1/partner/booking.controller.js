const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Booking } = require("@/models/booking.model");
const { TimelineTracker } = require("@/models/timelinetracker.model");
const moment = require("moment");
const mongoose = require("mongoose");
class BookingController {
  static index = async (req, res) => {
    try {
      const owner_id = req.user.id;
      const status = req.query.status || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const filter = { owner_id };

      console.log(status);

      if (status) {
        // Validasi status yang valid
        const validStatuses = [
          "pending",
          "confirmed",
          "cancelled",
          "completed",
        ];
        if (validStatuses.includes(status)) {
          filter.status = status;
        }
      }

      const total = await Booking.countDocuments(filter);
      const datas = await Booking.find(filter)
        .populate("address_id")
        .populate("user_id")
        .populate("payment_method_id")
        .populate("partner_id")
        .populate({
          path: "service_id",
          populate: {
            path: "category_id",
            model: "Category",
          },
        })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const payload = {
        data: datas,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
      return ApiResponse.successResponse(
        res,
        "success get bookings partner",
        payload,
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

  static confirmBooking = async (req, res) => {
    try {
      const { booking_id, customer_id } = req.params;
      const owner_id = req.user.id;
      const updateStatusBooking = await Booking.findOneAndUpdate(
        {
          _id: booking_id,
          user_id: customer_id,
        },
        {
          status: "confirmed",
        }
      );

      await TimelineTracker.findOneAndUpdate(
        {
          owner_id,
          booking_id,
        },
        {
          $set: {
            "tracker.confirmed_at": new Date(),
            status: "confirmed",
            notes: "Booking dikonfirmasi",
          },
        }
      );

      // LOGIC APP
      return ApiResponse.successResponse(
        res,
        "success confirmed booking",
        updateStatusBooking,
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

  static getTotalBookingCompleted = async (req, res) => {
    try {
      const owner_id = req.user.id;
      const totalCompletedBooking = await Booking.countDocuments({
        owner_id,
        status: "completed",
      });
      return ApiResponse.successResponse(
        res,
        "success get total completed booking",
        totalCompletedBooking
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static getTotalBooking = async (req, res) => {
    try {
      const owner_id = req.user.id;
      const range_date = req.query.range_date || "today";

      const params = {
        owner_id,
      };

      if (range_date === "today") {
        const todayStart = moment().utc().startOf("day").toDate();
        const todayEnd = moment().utc().endOf("day").toDate();

        params.createdAt = { $gte: todayStart, $lte: todayEnd };
      } else if (range_date === "week") {
        const weekStart = moment()
          .utc()
          .subtract(7, "days")
          .startOf("day")
          .toDate();
        const now = moment().utc().endOf("day").toDate();

        params.createdAt = { $gte: weekStart, $lte: now };
      }

      const totalBookings = await Booking.countDocuments(params);

      return ApiResponse.successResponse(
        res,
        "Success get total completed bookings",
        totalBookings
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };

  static getTotalRevenue = async (req, res) => {
    try {
      const owner_id = req.user.id;

      const totalRevenueResult = await Booking.aggregate([
        {
          $match: {
            owner_id: new mongoose.Types.ObjectId(owner_id),
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$total_price" },
          },
        },
      ]);

      const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

      return ApiResponse.successResponse(res, "Success get total revenue", {
        totalRevenue,
      });
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

module.exports = BookingController;
