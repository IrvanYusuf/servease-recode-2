const Joi = require("joi");

const createAddressSchema = Joi.object({
  label_alamat: Joi.string().max(100).required().messages({
    "string.empty": "Address Label is required.",
  }),

  phone: Joi.string().min(12).max(15).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Phone number must be at least 12 digits",
    "string.max": "Phone number max 15 digits",
  }),

  province: Joi.string().required().messages({
    "string.empty": "Province is required.",
  }),

  city: Joi.string().required().messages({
    "string.empty": "City / Regency is required.",
  }),

  district: Joi.string().required().messages({
    "string.empty": "District is required.",
  }),

  street_name: Joi.string().required().messages({
    "string.empty": "Street Name is required.",
  }),

  description: Joi.string().allow("").optional(),
});

module.exports = { createAddressSchema };
