const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { createBookingSchema } = require("@/validation/booking.validation");
const { Booking } = require("@/models/booking.model");
const { Service } = require("@/models/service.model");
const { APP_FEE } = require("@/constant/constant");
const { uploadToCloudinary } = require("@/utils/uploadToCloudinary");
class BookingController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;
      const status = req.query.status || "";
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
      const bookings = await Booking.find(filter)
        .populate({
          path: "service_id",
          populate: {
            path: "category_id",
            model: "Category",
          },
        })
        .populate("partner_id")
        .populate("address_id")
        .populate("payment_method_id")
        .sort({ createdAt: -1 });
      return ApiResponse.successResponse(
        res,
        "success get bookings",
        bookings,
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
      const user_id = req.user.id;
      const { booking_id } = req.params;
      const booking = await Booking.findOne({ _id: booking_id, user_id })
        .populate("user_id")
        .populate({
          path: "service_id",
          populate: {
            path: "category_id",
            model: "Category",
          },
        })
        .populate("partner_id")
        .populate("address_id")
        .populate("payment_method_id");
      return ApiResponse.successResponse(
        res,
        "success get detail booking",
        booking
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
      const result = createBookingSchema.validate(body, { abortEarly: false });
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
      const service = await Service.findById(data.service_id);
      const user_id = req.user.id;
      const total_price = service.price + APP_FEE;

      const paymentDue = new Date();
      paymentDue.setHours(paymentDue.getHours() + 24);
      const booking = await Booking.create({
        user_id,
        address_id: data.address_id,
        partner_id: data.partner_id,
        payment_method_id: data.payment_method_id,
        booking_date: data.booking_date,
        booking_time: data.booking_time,
        bring_ladder: data.bring_ladder,
        service_id: service._id,
        notes: data.notes,
        total_price,
        payment_due: paymentDue,
      });
      return ApiResponse.successResponse(
        res,
        "success create booking",
        booking,
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

  static uploadPaymentProof = async (req, res) => {
    try {
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
        { payment_proof: paymentProofUrl }
      );
      return ApiResponse.successResponse(
        res,
        "success upload payment proof",
        update_booking
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
  static completeBooking = async (req, res) => {
    try {
      const { booking_id } = req.params;
      const user_id = req.user.id;

      const update_booking = await Booking.findOneAndUpdate(
        {
          _id: booking_id,
          user_id,
        },
        { status: "completed" }
      );
      return ApiResponse.successResponse(
        res,
        "Booking marked as completed successfully",
        update_booking
      );
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", {
        server: error.message,
      });
    }
  };
}

module.exports = BookingController;
