"use strict";

var express = require("express");
var earningRoutes = require("./earning.route.js");
var reviewRoutes = require("./review.route.js");
var bookingPartnerRoutes = require("./booking.route.js");
var servicePartnerRoutes = require("./service.route.js");
var router = express.Router();
router.use("/bookings", bookingPartnerRoutes);
router.use("/services", servicePartnerRoutes);
router.use("/reviews", reviewRoutes);
router.use("/earnings", earningRoutes);
module.exports = router;