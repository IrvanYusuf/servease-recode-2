const BookingController = require("@/controllers/v1/partner/booking.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, BookingController.index);
router.patch(
  "/confirm/:customer_id/:booking_id",
  authMiddleware,
  BookingController.confirmBooking
);
module.exports = router;
