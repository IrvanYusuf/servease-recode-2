const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const { Booking } = require("@/models/booking.model");
class BookingController {
  static index = async (req, res) => {
    try {
      const user_id = req.user.id;
      console.log("debug");
      const datas = await Booking.find({ owner_id: user_id })
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

      // LOGIC APP
      return ApiResponse.successResponse(
        res,
        "success get bookings partner",
        datas,
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

  static confirmBooking = async (req, res) => {
    try {
      const { booking_id, customer_id } = req.params;
      console.log("debug");
      const updateStatusBooking = await Booking.findOneAndUpdate(
        {
          _id: booking_id,
          user_id: customer_id,
        },
        {
          status: "confirmed",
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
}

module.exports = BookingController;
