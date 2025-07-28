const ReviewController = require("@/controllers/v1/partner/review.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, ReviewController.index);

module.exports = router;
