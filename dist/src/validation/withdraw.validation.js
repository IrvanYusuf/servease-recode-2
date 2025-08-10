"use strict";

var Joi = require("joi");
var createWithdraw = Joi.object({
  amount: Joi.number().min(1).required(),
  admin_fee: Joi.number().min(1).required(),
  bank_name: Joi.string().trim().required(),
  account_name: Joi.string().trim().required(),
  account_number: Joi.string().trim().required(),
  notes: Joi.string().optional()
});
module.exports = {
  createWithdraw: createWithdraw
};