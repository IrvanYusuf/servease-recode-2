const Joi = require("joi");

const createBookingSchema = Joi.object({
  booking_date: Joi.string().required().messages({
    "string.empty": "Booking date is required",
    "any.required": "Booking date is required",
  }),
  address_id: Joi.string().required().messages({
    "string.empty": "Address id is required",
    "any.required": "Address id is required",
  }),
  service_id: Joi.string().required().messages({
    "string.empty": "Service id is required",
    "any.required": "Service id is required",
  }),
  partner_id: Joi.string().required().messages({
    "string.empty": "Partner id is required",
    "any.required": "Partner id is required",
  }),
  payment_method_id: Joi.string().required().messages({
    "string.empty": "Payment method id is required",
    "any.required": "Payment method id is required",
  }),

  total_price: Joi.number().min(1).required().messages({
    "number.empty": "Total price is required",
  }),

  booking_time: Joi.string()
    .required()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .messages({
      "string.empty": "Booking time is required",
      "any.required": "Booking time is required",
      "string.pattern.base": "Invalid time format (expected HH:mm)",
    }),

  bring_ladder: Joi.boolean().default(false).required().messages({
    "any.required": "Bring ladder is required",
  }),

  notes: Joi.string().optional(),
});

module.exports = { createBookingSchema };
