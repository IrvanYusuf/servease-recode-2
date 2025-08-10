"use strict";

var express = require("express");
var reviewRoutes = require("./review.route.js");
var bookingRoutes = require("./booking.route.js");
var paymentmethodRoutes = require("./paymentmethod.route.js");
var addressRoutes = require("./address.route.js");
var partnerRoutes = require("./partner.route.js");
var videoRoutes = require("./video.route.js");
var categoryRoutes = require("./category.route.js");
var serviceRoutes = require("./service.route.js");
var bannerRoutes = require("./banner.route.js");
var authRoutes = require("./auth.route.js");
var userRoutes = require("./user.routes.js");

// partner dashboard
var partnerDashboardRoutes = require("./partner/index.js");
var router = express.Router();
router.use("/users", userRoutes);
router.use("/auths", authRoutes);
router.use("/banners", bannerRoutes);
router.use("/services", serviceRoutes);
router.use("/categories", categoryRoutes);
router.use("/videos", videoRoutes);
router.use("/partners", partnerRoutes);
router.use("/addresses", addressRoutes);
router.use("/payment-methods", paymentmethodRoutes);
router.use("/bookings", bookingRoutes);
router.use("/reviews", reviewRoutes);

// partner dashboard routes
router.use("/dashboard/partners", partnerDashboardRoutes);
module.exports = router;