const upload = require("@/config/multer");
const PartnerController = require("@/controllers/v1/partner.controller");
const checkFilePresenceHandler = require("@/errors/checkFilePresenceHandler");
const authMiddleware = require("@/middlewares/auth.middleware");
const validateMiddleware = require("@/middlewares/validate.middleware");
const { createCompanySchema } = require("@/validation/company.validation");
const express = require("express");

const router = express.Router();

router.use(authMiddleware);

router.get("/", PartnerController.index);

router.post(
  "/",
  upload.single("profile_image"),
  validateMiddleware(createCompanySchema),
  checkFilePresenceHandler(["profile_image"]),
  PartnerController.store
);

router.delete("/:partner_id", PartnerController.destroy);

module.exports = router;
