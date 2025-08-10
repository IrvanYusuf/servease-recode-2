const upload = require("@/config/multer");
const ServiceController = require("@/controllers/v1/partner/service.controller");
const checkFilePresenceHandler = require("@/errors/checkFilePresenceHandler");
const authMiddleware = require("@/middlewares/auth.middleware");
const validateMiddleware = require("@/middlewares/validate.middleware");
const { createServiceSchema } = require("@/validation/service.validation");
const express = require("express");

const router = express.Router();

// private routes
router.use(authMiddleware);
router.get("/", ServiceController.index);
router.get("/total-services", ServiceController.getTotalServices);
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery_images", maxCount: 7 },
  ]),
  validateMiddleware(createServiceSchema),
  checkFilePresenceHandler(["thumbnail", "gallery_images"]),
  ServiceController.store
);
module.exports = router;
