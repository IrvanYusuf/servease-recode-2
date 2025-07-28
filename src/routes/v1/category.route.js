const upload = require("@/config/multer");
const CategoryController = require("@/controllers/v1/category.controller");
const express = require("express");

const router = express.Router();

router.get("/", CategoryController.index);
router.get("/detail/:categoryId", CategoryController.show);

// store
router.post("/", upload.single("image"), CategoryController.store);

module.exports = router;
