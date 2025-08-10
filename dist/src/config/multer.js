"use strict";

var multer = require("multer");
var fileFilter = function fileFilter(req, file, cb) {
  var allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format. Allowed formats: JPG, JPEG, PNG, WEBP."), false);
  }
};

// Batasi ukuran file (3MB)
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024
  },
  // 3MB
  fileFilter: fileFilter
});
module.exports = upload;