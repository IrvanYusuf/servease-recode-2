const EarningController = require("@/controllers/v1/partner/earning.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const validateMiddleware = require("@/middlewares/validate.middleware");
const { createWithdraw } = require("@/validation/withdraw.validation");
const express = require("express");

const router = express.Router();

router.use(authMiddleware);
router.get("/earning-history", EarningController.getEarningsHistory);
router.get("/withdraw-history", EarningController.getWithdrawHistory);
router.get(
  "/total-monthly-withdraw",
  EarningController.getTotalMonthlyWithdraw
);
router.post(
  "/withdraw",
  validateMiddleware(createWithdraw),
  EarningController.makeWithdraw
);

module.exports = router;
