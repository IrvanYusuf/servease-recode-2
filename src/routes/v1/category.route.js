const upload = require("@/config/multer");
const CategoryController = require("@/controllers/v1/category.controller");
const checkFilePresenceHandler = require("@/errors/checkFilePresenceHandler");
const validateMiddleware = require("@/middlewares/validate.middleware");
const { createCategorySchema } = require("@/validation/category.validation");
const express = require("express");

const router = express.Router();

router.get("/", CategoryController.index);
router.get("/detail/:category_id", CategoryController.show);

// store
router.post(
  "/",
  upload.single("image"),
  validateMiddleware(createCategorySchema),
  checkFilePresenceHandler(["image"]),
  CategoryController.store
);

module.exports = router;
