"use strict";

var checkFilePresenceHandler = function checkFilePresenceHandler() {
  var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["image"];
  return function (req, res, next) {
    var errors = [];
    fieldNames.forEach(function (fieldName) {
      var isSingleUpload = !!req.file && fieldNames.length === 1;
      var fileExists = isSingleUpload && req.file || req.files && req.files[fieldName] && req.files[fieldName].length > 0;
      if (!fileExists) {
        errors.push({
          field: fieldName,
          message: "".concat(fieldName, " wajib diupload.")
        });
      }
    });
    console.log(errors);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validasi file gagal",
        errors: errors
      });
    }
    next();
  };
};
module.exports = checkFilePresenceHandler;