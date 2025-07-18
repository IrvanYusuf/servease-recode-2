const express = require("express");
const categoryRoutes = require("./category.route.js");
const serviceRoutes = require("./service.route.js");
const bannerRoutes = require("./banner.route.js");
const authRoutes = require("./auth.route.js");
const postRoutes = require("./post.route.js");
const userRoutes = require("./user.routes.js");
const router = express.Router();

router.use("/users", userRoutes);

router.use("/posts", postRoutes);
router.use("/auths", authRoutes);

router.use("/banners", bannerRoutes);
router.use("/services", serviceRoutes);
router.use("/categories", categoryRoutes);
module.exports = router;
