"use strict";

var Joi = require("joi");
var createAddressSchema = Joi.object({
  label_alamat: Joi.string().trim().min(5).max(100).required().messages({
    "string.min": " Address must be at least 5 character",
    "string.max": "Address max 100 character",
    "string.empty": "Address is required"
  }),
  phone: Joi.string().trim().min(12).max(15).required().messages({
    "string.min": "Phone number must be at least 12 digits",
    "string.max": "Phone number max 15 digits",
    "string.empty": "Phone is required"
  }),
  province: Joi.string().trim().min(5).max(100).required().messages({
    "string.min": " Province must be at least 5 character",
    "string.max": "Province max 5 character",
    "string.empty": "Province is required"
  }),
  city: Joi.string().trim().min(5).max(100).required().messages({
    "string.min": " City must be at least 5 character",
    "string.max": "City max 5 character",
    "string.empty": "City is required"
  }),
  district: Joi.string().trim().min(5).max(100).required().messages({
    "string.min": " District must be at least 5 character",
    "string.max": "District max 5 character",
    "string.empty": "District is required"
  }),
  street_name: Joi.string().trim().min(10).max(200).required().messages({
    "string.min": " Street Name must be at least 5 character",
    "string.max": "Street Name max 5 character",
    "string.empty": "Street Name is required"
  }),
  description: Joi.string().trim().optional()
});
var updateAddressSchema = Joi.object({
  label_alamat: Joi.string().trim().min(5).max(100).optional().messages({
    "string.min": " Address must be at least 5 character",
    "string.max": "Address max 5 character"
  }),
  phone: Joi.string().trim().min(12).max(15).optional().messages({
    "string.min": "Phone number must be at least 12 digits",
    "string.max": "Phone number max 15 digits"
  }),
  province: Joi.string().trim().min(5).max(100).optional().messages({
    "string.min": " Province must be at least 5 character",
    "string.max": "Province max 5 character"
  }),
  city: Joi.string().trim().min(5).max(100).optional().messages({
    "string.min": " City must be at least 5 character",
    "string.max": "City max 5 character"
  }),
  district: Joi.string().trim().min(5).max(100).optional().messages({
    "string.min": " District must be at least 5 character",
    "string.max": "District max 5 character"
  }),
  street_name: Joi.string().trim().min(10).max(200).optional().messages({
    "string.min": " Street Name must be at least 5 character",
    "string.max": "Street Name max 5 character"
  }),
  description: Joi.string().trim().optional()
});
module.exports = {
  createAddressSchema: createAddressSchema,
  updateAddressSchema: updateAddressSchema
};