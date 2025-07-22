const upload = require("@/config/multer");
const BookingController = require("@/controllers/v1/booking.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/detail/:booking_id", authMiddleware, BookingController.show);
router.get("/", authMiddleware, BookingController.index);
router.post("/", authMiddleware, BookingController.store);

// update payment proof
router.patch(
  "/payment-proof/:booking_id",
  upload.single("payment_proof"),
  authMiddleware,
  BookingController.uploadPaymentProof
);

// complete booking
router.patch(
  "/complete/:booking_id",
  authMiddleware,
  BookingController.completeBooking
);

module.exports = router;
