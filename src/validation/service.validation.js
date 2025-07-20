const Joi = require("joi");

const createServiceSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "Company name is required",
  }),
  price: Joi.number().min(1).required().messages({
    "number.empty": "Price is required",
  }),

  partner_id: Joi.string().min(1).required().messages({
    "string.empty": "Company is required",
  }),

  category_id: Joi.string().min(1).required().messages({
    "string.empty": "Category is required",
  }),

  description: Joi.string().min(10).required().messages({
    "string.empty": "Description must be at least 10 characters",
    "string.min": "Description must be at least 10 characters",
  }),
});

module.exports = { createServiceSchema };
