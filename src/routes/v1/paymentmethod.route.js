const upload = require("@/config/multer");
const PaymentMethodController = require("@/controllers/v1/paymentmethod.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const validateMiddleware = require("@/middlewares/validate.middleware");
const {
  createPaymentMethodSchema,
} = require("@/validation/paymentMethod.validation");
const express = require("express");

const router = express.Router();

// public route
router.get("/", PaymentMethodController.index);

// private route
router.use(authMiddleware);
router.post(
  "/",
  upload.single("bank_logo"),
  validateMiddleware(createPaymentMethodSchema),
  PaymentMethodController.store
);

module.exports = router;
