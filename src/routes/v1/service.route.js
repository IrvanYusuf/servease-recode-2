const upload = require("@/config/multer");
const ServiceController = require("@/controllers/v1/service.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, ServiceController.index);
router.get("/search", ServiceController.searchServices);
router.get("/popular", ServiceController.getPopularServices);
router.get("/category/:category_id", ServiceController.findByCategory);
router.get("/detail/:service_id", ServiceController.show);
router.get("/reviews/:service_id", ServiceController.getServiceReview);

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery_images", maxCount: 7 },
  ]),
  authMiddleware,
  ServiceController.store
);

module.exports = router;
