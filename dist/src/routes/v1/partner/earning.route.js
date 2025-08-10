"use strict";

var EarningController = require("../../../controllers/v1/partner/earning.controller");
var authMiddleware = require("../../../middlewares/auth.middleware");
var validateMiddleware = require("../../../middlewares/validate.middleware");
var _require = require("../../../validation/withdraw.validation"),
  createWithdraw = _require.createWithdraw;
var express = require("express");
var router = express.Router();
router.use(authMiddleware);
router.get("/earning-history", EarningController.getEarningsHistory);
router.get("/withdraw-history", EarningController.getWithdrawHistory);
router.get("/balance", EarningController.getUserBalance);
router.get("/total-monthly-withdraw", EarningController.getTotalMonthlyWithdraw);
router.post("/withdraw", validateMiddleware(createWithdraw), EarningController.makeWithdraw);
module.exports = router;