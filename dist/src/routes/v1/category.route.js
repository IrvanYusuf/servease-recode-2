"use strict";

var upload = require("../../config/multer");
var CategoryController = require("../../controllers/v1/category.controller");
var checkFilePresenceHandler = require("../../errors/checkFilePresenceHandler");
var validateMiddleware = require("../../middlewares/validate.middleware");
var _require = require("../../validation/category.validation"),
  createCategorySchema = _require.createCategorySchema;
var express = require("express");
var router = express.Router();
router.get("/", CategoryController.index);
router.get("/detail/:category_id", CategoryController.show);

// store
router.post("/", upload.single("image"), validateMiddleware(createCategorySchema), checkFilePresenceHandler(["image"]), CategoryController.store);
module.exports = router;