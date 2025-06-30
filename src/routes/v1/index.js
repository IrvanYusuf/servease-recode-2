import express from "express";
import categoryRoutes from "./category.route.js";
import postRoutes from "./post.route.js";
import userRoutes from "./user.routes.js";
const router = express.Router();

router.use("/users", userRoutes);

router.use("/posts", postRoutes);
router.use("/categorys", categoryRoutes);
export default router;
