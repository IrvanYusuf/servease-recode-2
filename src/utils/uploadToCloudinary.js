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

const uploadMultipleToCloudinary = async (files) => {
  const uploadPromises = files.map((file) =>
    uploadToCloudinary({ buffer: file.buffer })
  );

  // Tunggu semua upload selesai
  const urls = await Promise.all(uploadPromises);

  return urls;
};

// video upload
const uploadVideoToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: CONFIG.CLOUDINARY_FOLDER,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = {
  uploadToCloudinary,
  uploadVideoToCloudinary,
  uploadMultipleToCloudinary,
};
