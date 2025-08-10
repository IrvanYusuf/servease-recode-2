"use strict";

// utils/dayjs.js
var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc.js");
var timezone = require("dayjs/plugin/timezone.js");
dayjs.extend(utc);
dayjs.extend(timezone);
module.exports = dayjs;