const BookingController = require("@/controllers/v1/partner/booking.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, BookingController.index);
router.get("/total-booking", authMiddleware, BookingController.getTotalBooking);
router.get("/total-revenue", authMiddleware, BookingController.getTotalRevenue);
router.get(
  "/total-completed-booking",
  authMiddleware,
  BookingController.getTotalBookingCompleted
);
router.patch(
  "/confirm/:customer_id/:booking_id",
  authMiddleware,
  BookingController.confirmBooking
);
module.exports = router;
