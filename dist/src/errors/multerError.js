"use strict";

var multer = require("multer");
function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Error dari Multer (misal file terlalu besar)
    var errors = [{
      field: "image",
      message: err.message // biasanya: "File too large"
    }];
    return res.status(400).json({
      message: "Validasi file gagal",
      errors: errors
    });
  } else if (err) {
    // Error dari fileFilter (format file)
    var _errors = [{
      field: "image",
      message: err.message // misal: "Format file tidak didukung!"
    }];
    return res.status(400).json({
      message: "Validasi file gagal",
      errors: _errors
    });
  }
  next();
}
module.exports = multerErrorHandler;