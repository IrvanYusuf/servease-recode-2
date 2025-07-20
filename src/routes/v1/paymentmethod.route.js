const PaymentMethodController = require("@/controllers/v1/paymentmethod.controller");
const express = require("express");

const router = express.Router();

router.get("/", PaymentMethodController.index);

module.exports = router;
