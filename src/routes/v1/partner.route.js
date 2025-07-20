const upload = require("@/config/multer");
const PartnerController = require("@/controllers/v1/partner.controller");
const authMiddleware = require("@/middlewares/auth.middleware");
const express = require("express");

const router = express.Router();

router.get("/", authMiddleware, PartnerController.index);

router.post(
  "/",
  upload.single("profile_image"),
  authMiddleware,
  PartnerController.store
);

module.exports = router;
