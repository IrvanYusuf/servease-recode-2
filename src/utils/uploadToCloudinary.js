const { CONFIG } = require("@/config");
const cloudinary = require("@/config/cloudinary.js");
const streamifier = require("streamifier");

const uploadToCloudinary = ({ buffer }) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: CONFIG.CLOUDINARY_FOLDER,
        format: "webp",
        transformation: [{ quality: "auto" }],
      },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;
