"use strict";

var upload = require("../../../config/multer");
var ServiceController = require("../../../controllers/v1/partner/service.controller");
var checkFilePresenceHandler = require("../../../errors/checkFilePresenceHandler");
var authMiddleware = require("../../../middlewares/auth.middleware");
var validateMiddleware = require("../../../middlewares/validate.middleware");
var _require = require("../../../validation/service.validation"),
  createServiceSchema = _require.createServiceSchema;
var express = require("express");
var router = express.Router();

// private routes
router.use(authMiddleware);
router.get("/", ServiceController.index);
router.get("/total-services", ServiceController.getTotalServices);
router.post("/", upload.fields([{
  name: "thumbnail",
  maxCount: 1
}, {
  name: "gallery_images",
  maxCount: 7
}]), validateMiddleware(createServiceSchema), checkFilePresenceHandler(["thumbnail", "gallery_images"]), ServiceController.store);
module.exports = router;