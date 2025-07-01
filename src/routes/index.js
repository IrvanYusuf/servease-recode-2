import express from "express";
import apiV1 from "@/routes/v1/index.js";

const router = express.Router();

router.use("/v1", apiV1);

export default router;
