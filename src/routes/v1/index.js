import express from "express";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.route.js";
import postRoutes from "./post.route.js";
const router = express.Router();

router.use("/users", userRoutes);

router.use("/posts", postRoutes);
router.use("/categorys", categoryRoutes);
export default router;
