"use strict";

function getPublicIdCloudinary(url) {
  try {
    var parts = url.split("/");
    var fileNameWithExt = parts.pop(); // tqjar7vignsiglw2ovsw.webp
    var publicId = fileNameWithExt.split(".")[0];
    var folderPath = parts.slice(7).join("/"); // servease
    return "".concat(folderPath, "/").concat(publicId);
  } catch (_unused) {
    return null;
  }
}
module.exports = getPublicIdCloudinary;