const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Booking } = require("@/models/booking.model");
const { Service } = require("@/models/service.model");
const { APP_FEE } = require("@/constant/constant");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
const { TimelineTracker } = require("@/models/timelinetracker.model");
const ApiError = require("@/errors/apiError");
const { PaymentMethod } = require("@/models/paymentMethod.model");
const { User } = require("@/models/user.model");
class BookingController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;
      const status = req.query.status || "";
      const review_status = req.query.review_status || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const filter = { user_id };

      // Tambah filter status jika ada dan bukan 'all'
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

      if (review_status) {
        // Validasi status yang valid
        const validStatusReviews = ["not_reviewed", "reviewed"];
        if (validStatusReviews.includes(review_status)) {
          filter.review_status = review_status;
        }
      }

      const total = await Booking.countDocuments(filter);

      const bookings = await Booking.find(filter)
        .populate({
          path: "service_id",
          populate: [
            {
              path: "category_id",
              model: "Category",
            },
            {
              path: "user_id",
              model: "User",
            },
          ],
        })
        .populate("partner_id")
        .populate("address_id")
        .populate("payment_method_id")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

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
        "success get bookings",
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

  static show = async (req, res, next) => {
    const { booking_id } = req.params;
    const booking = await Booking.findOne({ _id: booking_id })
      .populate("user_id")
      .populate({
        path: "service_id",
        populate: [
          {
            path: "category_id",
            model: "Category",
          },
          {
            path: "user_id",
            model: "User",
          },
        ],
      })
      .populate("partner_id")
      .populate("address_id")
      .populate("payment_method_id");

    if (!booking) {
      return next(new ApiError("Booking not found", StatusCodes.NOT_FOUND));
    }

    const timelinetracker = await TimelineTracker.findOne({ booking_id });

    const payload = booking
      ? { ...booking.toObject(), timelinetracker }
      : { timelinetracker };

    return ApiResponse.successResponse(
      res,
      "success get detail booking",
      payload
    );
  };

  static store = async (req, res, next) => {
    const data = req.validated;
    const service = await Service.findById(data.service_id);

    if (!service) {
      return next(new ApiError("Service not found", StatusCodes.NOT_FOUND));
    }

    const user_id = req.user.id;
    const total_price = service.price + APP_FEE;

    const paymentDue = new Date();
    paymentDue.setHours(paymentDue.getHours() + 24);
    const booking = await Booking.create({
      user_id,
      address_id: data.address_id,
      partner_id: data.partner_id,
      owner_id: data.owner_id,
      payment_method_id: data.payment_method_id,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      bring_ladder: data.bring_ladder,
      service_id: service._id,
      notes: data.notes,
      total_price,
      sub_total: service.price,
      app_cost: APP_FEE,
      payment_due: paymentDue,
    });

    const createTimelineTracker = await TimelineTracker.create({
      user_id,
      booking_id: booking._id,
      owner_id: data.owner_id,
      partner_id: data.partner_id,
      service_id: data.service_id,
      tracker: {
        booked_at: new Date(),
      },
      notes: "Booking dibuat",
    });

    return ApiResponse.successResponse(
      res,
      "success create booking",
      booking,
      null,
      StatusCodes.CREATED
    );
  };

  static uploadPaymentProof = async (req, res) => {
    const { booking_id } = req.params;
    const user_id = req.user.id;

    const paymentProofUrl = await uploadToCloudinary({
      buffer: req.file.buffer,
    });

    const update_booking = await Booking.findOneAndUpdate(
      {
        _id: booking_id,
        user_id,
      },
      { payment_proof: paymentProofUrl, payment_status: "paid" }
    );

    await TimelineTracker.findOneAndUpdate(
      {
        owner_id: update_booking.owner_id,
        booking_id,
      },
      {
        $set: {
          "tracker.payment_at": new Date(),
          status: "payment",
          notes: "Melakukan Pembayaran",
        },
      }
    );
    return ApiResponse.successResponse(
      res,
      "success upload payment proof",
      update_booking
    );
  };

  static completeBooking = async (req, res) => {
    const { booking_id } = req.params;
    // const user_id = req.user.id;
    const paymentStatus = req.body.payment_status;
    const params = { status: "completed" };

    if (paymentStatus && paymentStatus.trim() !== "") {
      params.payment_status = paymentStatus;
    }

    const update_booking = await Booking.findOneAndUpdate(
      {
        _id: booking_id,
      },
      params
    );

    const { payment_method_id, service_id, owner_id } = update_booking;
    const paymentMethodName = await PaymentMethod.findById(payment_method_id);
    // Payload dasar
    const trackerUpdate = {
      "tracker.completed_at": new Date(),
      status: "completed",
      notes: "Booking selesai",
    };

    // Jika cash, tambahkan payment_at
    if (paymentMethodName.type === "cash") {
      trackerUpdate["tracker.payment_at"] = new Date();
    }

    // Update ke TimelineTracker
    await TimelineTracker.findOneAndUpdate(
      {
        owner_id: owner_id,
        booking_id,
      },
      {
        $set: trackerUpdate,
      }
    );

    const service = await Service.findById(service_id);
    const user = await User.findById(owner_id);

    console.log({ user, balance: user.balance, price: service.price });

    user.balance =
      Number(user.balance ? user.balance : 0) + Number(service.price);
    await user.save();
    return ApiResponse.successResponse(
      res,
      "Booking marked as completed successfully",
      update_booking
    );
  };

  static getTotalBooking = async (req, res) => {
    const user_id = req.user.id;
    const range_date = req.query.range_date || "all";

    const params = {
      user_id,
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

  static getTotalBookingCompleted = async (req, res) => {
    const user_id = req.user.id;
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

  static getTotalBookingNotReviewed = async (req, res) => {
    const user_id = req.user.id;
    const totalNotReviewedBooking = await Booking.countDocuments({
      user_id,
      status: "completed",
      review_status: "not_reviewed",
    });
    return ApiResponse.successResponse(
      res,
      "success get total not reviewed booking",
      totalNotReviewedBooking
    );
  };
}

module.exports = BookingController;
