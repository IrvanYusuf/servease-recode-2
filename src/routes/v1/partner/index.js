const express = require("express");
const bookingRoutes = require("./booking.route.js");

const router = express.Router();

router.use("/bookings", bookingRoutes);

module.exports = router;
