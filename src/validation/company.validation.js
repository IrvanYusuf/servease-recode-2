const Joi = require("joi");

const createCompanySchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "Company name is required",
  }),

  province: Joi.string().min(1).required().messages({
    "string.empty": "Province is required",
  }),

  city: Joi.string().min(1).required().messages({
    "string.empty": "City is required",
  }),

  district: Joi.string().min(1).required().messages({
    "string.empty": "District is required",
  }),

  description: Joi.string().min(10).required().messages({
    "string.empty": "Description must be at least 10 characters",
    "string.min": "Description must be at least 10 characters",
  }),

  link_map: Joi.string().uri().required().messages({
    "string.empty": "Maps link is required",
    "string.uri": "Must be a valid URL",
  }),

  //   profile_image: Joi.object()
  //     .custom((file, helpers) => {
  //       if (!(file instanceof File)) {
  //         return helpers.message("Image is required");
  //       }
  //       if (file.size > 3 * 1024 * 1024) {
  //         return helpers.message("Max file size is 3MB");
  //       }
  //       return file;
  //     })
  //     .required(),
});

module.exports = { createCompanySchema };
