const ReviewController = require("@/controllers/v1/partner/review.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

// private routes
router.use(authMiddleware);
router.get("/", ReviewController.index);
router.get("/total-not-reviewed", ReviewController.getTotalBookingNotReviewed);
router.get("/total-all-review", ReviewController.getTotalBookingReview);

module.exports = router;
