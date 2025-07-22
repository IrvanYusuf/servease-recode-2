const Joi = require("joi");

const createPaymentMethodSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("cash", "bank_transfer").required(),

  description: Joi.string().allow(""),

  bank_name: Joi.string().when("type", {
    is: "bank_transfer",
    then: Joi.required().messages({
      "any.required": "Bank name is required for bank transfer",
    }),
    otherwise: Joi.optional(),
  }),

  account_number: Joi.string().when("type", {
    is: "bank_transfer",
    then: Joi.required().messages({
      "any.required": "Account number is required for bank transfer",
    }),
    otherwise: Joi.optional(),
  }),

  account_holder: Joi.string().when("type", {
    is: "bank_transfer",
    then: Joi.required().messages({
      "any.required": "Account holder is required for bank transfer",
    }),
    otherwise: Joi.optional(),
  }),
});

module.exports = { createPaymentMethodSchema };
