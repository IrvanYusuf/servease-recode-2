const multer = require("multer");

function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Error dari Multer (misal file terlalu besar)
    const errors = [
      {
        field: "image",
        message: err.message, // biasanya: "File too large"
      },
    ];
    return res.status(400).json({
      message: "Validasi file gagal",
      errors,
    });
  } else if (err) {
    // Error dari fileFilter (format file)
    const errors = [
      {
        field: "image",
        message: err.message, // misal: "Format file tidak didukung!"
      },
    ];
    return res.status(400).json({
      message: "Validasi file gagal",
      errors,
    });
  }

  next();
}

module.exports = multerErrorHandler;
