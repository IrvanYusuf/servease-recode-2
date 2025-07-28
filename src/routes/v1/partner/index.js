const express = require("express");
const reviewRoutes = require("./review.route.js");
const bookingPartnerRoutes = require("./booking.route.js");
const servicePartnerRoutes = require("./service.route.js");

const router = express.Router();

router.use("/bookings", bookingPartnerRoutes);
router.use("/services", servicePartnerRoutes);

router.use("/reviews", reviewRoutes);
module.exports = router;
