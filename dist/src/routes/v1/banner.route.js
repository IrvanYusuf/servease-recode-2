"use strict";

var upload = require("../../config/multer");
var BannerController = require("../../controllers/v1/banner.controller");
var checkFilePresenceHandler = require("../../errors/checkFilePresenceHandler");
var express = require("express");
var router = express.Router();
router.get("/", BannerController.index);
router.post("/", upload.single("image"), checkFilePresenceHandler(["image"]), BannerController.store);
module.exports = router;