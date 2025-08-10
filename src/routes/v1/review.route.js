const ReviewController = require("@/controllers/v1/review.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const validateMiddleware = require("@/middlewares/validate.middleware");
const {
  createReviewSchema,
  updateReviewSchema,
} = require("@/validation/review.validation");
const express = require("express");

const router = express.Router();

// private route
router.use(authMiddleware);

router.get("/", ReviewController.index);
router.get("/total-review", ReviewController.getTotalReviewed);
router.post(
  "/:booking_id",
  validateMiddleware(createReviewSchema),
  ReviewController.store
);
router.patch(
  "/:review_id",
  validateMiddleware(updateReviewSchema),
  ReviewController.update
);
router.delete("/:review_id", ReviewController.destroy);

module.exports = router;
