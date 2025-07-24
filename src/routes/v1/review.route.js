const ReviewController = require("@/controllers/v1/review.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, ReviewController.index);
router.post("/:booking_id", authMiddleware, ReviewController.store);

module.exports = router;
