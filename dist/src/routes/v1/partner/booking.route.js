"use strict";

var BookingController = require("../../../controllers/v1/partner/booking.controller");
var authMiddleware = require("../../../middlewares/auth.middleware");
var express = require("express");
var router = express.Router();

// private routes
router.use(authMiddleware);
router.get("/", BookingController.index);
router.get("/total-booking", BookingController.getTotalBooking);
router.get("/total-revenue", BookingController.getTotalRevenue);
router.get("/total-revenue-pending", BookingController.getTotalRevenuePending);
router.get("/total-monthly-revenue", BookingController.getMonthlyRevenue);
router.get("/total-completed-booking", BookingController.getTotalBookingCompleted);
router.get("/total-completed-booking-user/:user_id", BookingController.getTotalBookingCompleted);
router.get("/total-pending-booking", BookingController.getTotalBookingPending);
router.get("/total-confirmed-booking", BookingController.getTotalBookingOnGoing);
router.get("/total-cancelled-booking", BookingController.getTotalBookingCancelled);
router.patch("/confirm/:customer_id/:booking_id", BookingController.confirmBooking);
module.exports = router;