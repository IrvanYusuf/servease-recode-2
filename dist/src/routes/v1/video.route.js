"use strict";

var upload = require("../../config/multer");
var VideoController = require("../../controllers/v1/video.controller");
var checkFilePresenceHandler = require("../../errors/checkFilePresenceHandler");
var express = require("express");
var router = express.Router();
router.get("/", VideoController.index);
router.post("/", upload.single("thumbnail"), checkFilePresenceHandler(["thumbnail"]), VideoController.store);
module.exports = router;