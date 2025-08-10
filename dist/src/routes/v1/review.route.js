"use strict";

var ReviewController = require("../../controllers/v1/review.controller");
var authMiddleware = require("../../middlewares/auth.middleware");
var validateMiddleware = require("../../middlewares/validate.middleware");
var _require = require("../../validation/review.validation"),
  createReviewSchema = _require.createReviewSchema,
  updateReviewSchema = _require.updateReviewSchema;
var express = require("express");
var router = express.Router();

// private route
router.use(authMiddleware);
router.get("/", ReviewController.index);
router.get("/total-review", ReviewController.getTotalReviewed);
router.post("/:booking_id", validateMiddleware(createReviewSchema), ReviewController.store);
router.patch("/:review_id", validateMiddleware(updateReviewSchema), ReviewController.update);
router["delete"]("/:review_id", ReviewController.destroy);
module.exports = router;