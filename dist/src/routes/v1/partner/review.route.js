"use strict";

var ReviewController = require("../../../controllers/v1/partner/review.controller");
var authMiddleware = require("../../../middlewares/auth.middleware");
var express = require("express");
var router = express.Router();

// private routes
router.use(authMiddleware);
router.get("/", ReviewController.index);
router.get("/total-not-reviewed", ReviewController.getTotalBookingNotReviewed);
router.get("/total-all-review", ReviewController.getTotalBookingReview);
module.exports = router;