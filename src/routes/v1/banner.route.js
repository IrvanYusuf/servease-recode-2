const BannerController = require("@/controllers/v1/banner.controller");
const express = require("express");

const router = express.Router();

router.get("/", BannerController.index);
router.post("/", BannerController.store);

module.exports = router;
