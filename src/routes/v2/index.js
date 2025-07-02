import express from "express";
import authRoutes from "./auth.route.js";

const router = express.Router();

router.use("/auths", authRoutes);

export default router;
