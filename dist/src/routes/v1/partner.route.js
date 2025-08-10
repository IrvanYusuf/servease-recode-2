"use strict";

var upload = require("../../config/multer");
var PartnerController = require("../../controllers/v1/partner.controller");
var checkFilePresenceHandler = require("../../errors/checkFilePresenceHandler");
var authMiddleware = require("../../middlewares/auth.middleware");
var validateMiddleware = require("../../middlewares/validate.middleware");
var _require = require("../../validation/company.validation"),
  createCompanySchema = _require.createCompanySchema;
var express = require("express");
var router = express.Router();
router.use(authMiddleware);
router.get("/", PartnerController.index);
router.post("/", upload.single("profile_image"), validateMiddleware(createCompanySchema), checkFilePresenceHandler(["profile_image"]), PartnerController.store);
router["delete"]("/:partner_id", PartnerController.destroy);
module.exports = router;