const express = require("express");
const authRoutes = require("./auth.route.js");
const postRoutes = require("./post.route.js");
const userRoutes = require("./user.routes.js");
const router = express.Router();

router.use("/users", userRoutes);

router.use("/posts", postRoutes);
router.use("/auths", authRoutes);

module.exports = router;
