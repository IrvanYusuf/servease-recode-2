"use strict";

// import { CONFIG } from "@/config";
var _require = require("../config/index.js"),
  CONFIG = _require.CONFIG;
var getAppTimezone = function getAppTimezone() {
  return CONFIG.APP_TIMEZONE || "UTC";
};
module.exports = getAppTimezone;