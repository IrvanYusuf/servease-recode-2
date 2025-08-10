"use strict";

var Joi = require("joi");
var createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.min": "Category must be at least 2 characters",
    "string.max": "Category max 100 characters",
    "string.empty": "Category is required",
    "any.required": "Category is required"
  })
});
module.exports = {
  createCategorySchema: createCategorySchema
};