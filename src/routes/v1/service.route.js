const upload = require("@/config/multer");
const ServiceController = require("@/controllers/v1/service.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

// public routes
router.get("/search", ServiceController.searchServices);
router.get("/popular", ServiceController.getPopularServices);
router.get("/category/:category_id", ServiceController.findByCategory);
router.get("/detail/:service_id", ServiceController.show);
router.get("/reviews/:service_id", ServiceController.getServiceReview);

// private routes
router.use(authMiddleware);
router.get("/", ServiceController.index);

module.exports = router;
