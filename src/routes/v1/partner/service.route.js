const ServiceController = require("@/controllers/v1/partner/service.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, ServiceController.index);
router.get(
  "/total-services",
  authMiddleware,
  ServiceController.getTotalServices
);
module.exports = router;
