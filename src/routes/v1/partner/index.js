const express = require("express");
const earningRoutes = require("./earning.route.js");
const reviewRoutes = require("./review.route.js");
const bookingPartnerRoutes = require("./booking.route.js");
const servicePartnerRoutes = require("./service.route.js");

const router = express.Router();

router.use("/bookings", bookingPartnerRoutes);
router.use("/services", servicePartnerRoutes);

router.use("/reviews", reviewRoutes);
router.use("/earnings", earningRoutes);
module.exports = router;
