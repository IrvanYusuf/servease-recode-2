"use strict";

var Joi = require("joi");
var createReviewSchema = Joi.object({
  service_id: Joi.string().required().messages({
    "string.empty": "Service id is required",
    "any.required": "Service id is required"
  }),
  partner_id: Joi.string().required().messages({
    "string.empty": "Partner id is required",
    "any.required": "Partner id is required"
  }),
  owner_id: Joi.string().required().messages({
    "string.empty": "Owner id is required",
    "any.required": "Owner id is required"
  }),
  rating: Joi.number().min(1).max(5).required().messages({
    "number.base": "Rating must be a number",
    "number.min": "Minimum rating is 1",
    "number.max": "Maximum rating is 5",
    "any.required": "Rating is required"
  }),
  comment: Joi.string().required().messages({
    "string.empty": "comment id is required",
    "any.required": "comment id is required"
  })
});
var updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required().messages({
    "number.base": "Rating must be a number",
    "number.min": "Minimum rating is 1",
    "number.max": "Maximum rating is 5",
    "any.required": "Rating is required"
  }),
  comment: Joi.string().required().messages({
    "string.empty": "comment id is required",
    "any.required": "comment id is required"
  })
});
module.exports = {
  createReviewSchema: createReviewSchema,
  updateReviewSchema: updateReviewSchema
};