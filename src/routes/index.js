import express from "express";
import apiV2Routes from "./v2";
import apiV1Routes from "./v1/index.js";

const router = express.Router();

router.use("/v1", apiV1Routes);

router.use("/v2", apiV2Routes);
export default router;
