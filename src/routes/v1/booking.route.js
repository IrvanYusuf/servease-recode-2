const upload = require("@/config/multer");
const BookingController = require("@/controllers/v1/booking.controller");
const checkFilePresenceHandler = require("@/errors/checkFilePresenceHandler");
const authMiddleware = require("@/middlewares/auth.middleware");
cons = require("@/middlewares/auth.middleware");
const validateMiddleware = require("@/middlewares/validate.middleware");
const { createBookingSchema } = require("@/validation/booking.validation");
const express = require("express");

const router = express.Router();

router.use(authMiddleware);

router.get("/detail/:booking_id", BookingController.show);
router.get("/total-booking", BookingController.getTotalBooking);
router.get(
  "/total-booking-completed",
  BookingController.getTotalBookingCompleted
);

router.get(
  "/total-booking-not-reviewed",
  BookingController.getTotalBookingNotReviewed
);

router.get("/", BookingController.index);
router.post(
  "/",
  validateMiddleware(createBookingSchema),
  BookingController.store
);

// update payment proof
router.patch(
  "/payment-proof/:booking_id",
  upload.single("payment_proof"),
  checkFilePresenceHandler(["payment_proof"]),
  BookingController.uploadPaymentProof
);

// complete booking
router.patch("/complete/:booking_id", BookingController.completeBooking);

module.exports = router;
