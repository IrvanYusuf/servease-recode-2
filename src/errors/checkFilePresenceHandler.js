const checkFilePresenceHandler = (fieldNames = ["image"]) => {
  return (req, res, next) => {
    const errors = [];

    fieldNames.forEach((fieldName) => {
      const isSingleUpload = !!req.file && fieldNames.length === 1;

      const fileExists =
        (isSingleUpload && req.file) ||
        (req.files && req.files[fieldName] && req.files[fieldName].length > 0);

      if (!fileExists) {
        errors.push({
          field: fieldName,
          message: `${fieldName} wajib diupload.`,
        });
      }
    });
    console.log(errors);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validasi file gagal",
        errors,
      });
    }

    next();
  };
};

module.exports = checkFilePresenceHandler;
