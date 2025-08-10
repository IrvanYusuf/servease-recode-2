"use strict";

var _require = require("./index.js"),
  CONFIG = _require.CONFIG;
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLOUDINARY_API_KEY,
  api_secret: CONFIG.CLOUDINARY_API_SECRET
});
module.exports = cloudinary;