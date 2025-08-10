const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Booking } = require("@/models/booking.model");
const { TimelineTracker } = require("@/models/timelinetracker.model");
const moment = require("moment");
const mongoose = require("mongoose");
const { User } = require("@/models/user.model");
class BookingController {
  static index = async (req, res) => {
    const owner_id = req.user.id;
    const status = req.query.status || "";
    const search = req.query.search || "";
    const paymentStatus = req.query.payment_status || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    // Base filter
    const filter = { owner_id };

    // Filter by status booking
    if (status) {
      const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
      if (validStatuses.includes(status)) {
        filter.status = status;
      }
    }

    // Filter by payment status
    if (paymentStatus) {
      const validPaymentStatus = ["paid", "unpaid"];
      if (validPaymentStatus.includes(paymentStatus)) {
        filter.payment_status = paymentStatus;
      }
    }

    // Filter by date from and date to
    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.createdAt.$lte = new Date(req.query.to);
    }

    // Create base query
    let query = Booking.find(filter);

    // Populate related data
    query = query
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
      });

    if (search) {
      // Execute the populate query first to get populated data
      const allData = await query.exec();

      // Filter the populated data based on search criteria
      const regex = new RegExp(search, "i");
      const filteredData = allData.filter((booking) => {
        // Search by booking ID (convert ObjectId to string)
        const bookingIdMatch = booking._id.toString().match(regex);

        // Search by customer name
        const customerNameMatch = booking.user_id?.name?.match(regex);

        // Search by service name
        const serviceNameMatch = booking.service_id?.name?.match(regex);

        return bookingIdMatch || customerNameMatch || serviceNameMatch;
      });

      // Calculate pagination for filtered data
      const total = filteredData.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredData
        .sort((a, b) => b.createdAt - a.createdAt) // Sort by createdAt desc
        .slice(startIndex, endIndex);

      const payload = {
        data: paginatedData,
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
    }

    // If no search, use the optimized database query
    const total = await Booking.countDocuments(filter);
    const datas = await query
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

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
  };

  static confirmBooking = async (req, res) => {
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
  };

  static getTotalBookingCompleted = async (req, res) => {
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
  };

  static getTotalBookingCompletedUser = async (req, res) => {
    const { user_id } = req.params;

    const totalCompletedBooking = await Booking.countDocuments({
      user_id,
      status: "completed",
    });

    return ApiResponse.successResponse(
      res,
      "success get total completed booking",
      totalCompletedBooking
    );
  };

  static getTotalBooking = async (req, res) => {
    const owner_id = req.user.id;
    const range_date = req.query.range_date || "all";

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
  };

  static getTotalRevenue = async (req, res) => {
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
          totalRevenue: { $sum: "$sub_total" },
        },
      },
    ]);

    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

    return ApiResponse.successResponse(
      res,
      "Success get total revenue",
      totalRevenue
    );
  };

  static getTotalRevenuePending = async (req, res) => {
    const owner_id = req.user.id;

    const totalRevenueResult = await Booking.aggregate([
      {
        $match: {
          owner_id: new mongoose.Types.ObjectId(owner_id),
          status: "confirmed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$sub_total" },
        },
      },
    ]);

    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

    return ApiResponse.successResponse(
      res,
      "Success get total revenue",
      totalRevenue
    );
  };

  static getMonthlyRevenue = async (req, res) => {
    const owner_id = req.user.id;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          owner_id: new mongoose.Types.ObjectId(owner_id),
          status: "completed",
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$sub_total" },
        },
      },
    ]);

    const totalRevenue = monthlyRevenue[0]?.totalRevenue || 0;

    return ApiResponse.successResponse(
      res,
      "Success get monthly revenue",
      totalRevenue
    );
  };

  static getTotalBookingPending = async (req, res) => {
    const owner_id = req.user.id;
    const params = {
      status: "pending",
      owner_id,
    };
    const totalPendingBooking = await Booking.countDocuments(params);

    return ApiResponse.successResponse(
      res,
      "success get total pending booking",
      totalPendingBooking
    );
  };

  static getTotalBookingCancelled = async (req, res) => {
    const owner_id = req.user.id;
    const params = {
      status: "cancelled",
      owner_id,
    };
    const totalPendingBooking = await Booking.countDocuments(params);

    return ApiResponse.successResponse(
      res,
      "success get total cancelled booking",
      totalPendingBooking
    );
  };

  static getTotalBookingOnGoing = async (req, res) => {
    const owner_id = req.user.id;
    const params = {
      status: "confirmed",
      owner_id,
    };
    const totalPendingBooking = await Booking.countDocuments(params);

    return ApiResponse.successResponse(
      res,
      "success get total confirmed booking",
      totalPendingBooking
    );
  };
}

module.exports = BookingController;
