const upload = require("@/config/multer");
const VideoController = require("@/controllers/v1/video.controller");
const express = require("express");

const router = express.Router();

router.get("/", VideoController.index);
router.post("/", upload.single("thumbnail"), VideoController.store);

module.exports = router;
