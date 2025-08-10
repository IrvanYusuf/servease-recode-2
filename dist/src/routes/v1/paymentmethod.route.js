"use strict";

var upload = require("../../config/multer");
var PaymentMethodController = require("../../controllers/v1/paymentmethod.controller");
var authMiddleware = require("../../middlewares/auth.middleware");
var validateMiddleware = require("../../middlewares/validate.middleware");
var _require = require("../../validation/paymentMethod.validation"),
  createPaymentMethodSchema = _require.createPaymentMethodSchema;
var express = require("express");
var router = express.Router();

// public route
router.get("/", PaymentMethodController.index);

// private route
router.use(authMiddleware);
router.post("/", upload.single("bank_logo"), validateMiddleware(createPaymentMethodSchema), PaymentMethodController.store);
module.exports = router;