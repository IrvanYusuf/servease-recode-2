const upload = require("@/config/multer");
const PaymentMethodController = require("@/controllers/v1/paymentmethod.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/", PaymentMethodController.index);

router.post(
  "/",
  upload.single("bank_logo"),
  authMiddleware,
  PaymentMethodController.store
);

module.exports = router;
