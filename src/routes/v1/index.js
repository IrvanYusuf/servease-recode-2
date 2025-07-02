import express from "express";
import authRoutes from "./auth.route.js";
import postRoutes from "./post.route.js";
import userRoutes from "./user.routes.js";
const router = express.Router();

router.use("/users", userRoutes);

router.use("/posts", postRoutes);
router.use("/auths", authRoutes);
export default router;
