function getPublicIdCloudinary(url) {
  try {
    const parts = url.split("/");
    const fileNameWithExt = parts.pop(); // tqjar7vignsiglw2ovsw.webp
    const publicId = fileNameWithExt.split(".")[0];
    const folderPath = parts.slice(7).join("/"); // servease
    return `${folderPath}/${publicId}`;
  } catch {
    return null;
  }
}

module.exports = getPublicIdCloudinary;
