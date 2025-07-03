// import { CONFIG } from "@/config";
const { CONFIG } = require("@/config/index.js");

const getAppTimezone = () => CONFIG.APP_TIMEZONE || "UTC";

module.exports = getAppTimezone;
