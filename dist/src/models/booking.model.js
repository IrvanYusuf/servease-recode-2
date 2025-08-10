"use strict";

var _require = require("mongoose"),
  model = _require.model,
  Schema = _require.Schema;
var bookingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  partner_id: {
    type: Schema.Types.ObjectId,
    ref: "Partner",
    required: true
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // user role partner
    required: true
  },
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },
  payment_method_id: {
    type: Schema.Types.ObjectId,
    ref: "PaymentMethod",
    required: true
  },
  payment_proof: {
    type: String // URL/file untuk bukti pembayaran jika ada
  },
  payment_status: {
    type: String,
    "enum": ["unpaid", "paid", "failed"],
    "default": "unpaid"
  },
  payment_due: {
    type: Date
  },
  status: {
    type: String,
    "enum": ["pending", "confirmed", "cancelled", "completed"],
    "default": "pending"
  },
  total_price: {
    type: Number,
    required: true
  },
  sub_total: {
    type: Number
  },
  app_cost: {
    type: Number
  },
  booking_date: {
    type: Date,
    required: true
  },
  booking_time: {
    type: String,
    required: true
  },
  bring_ladder: {
    type: Boolean,
    required: true
  },
  review_status: {
    type: String,
    "enum": ["not_reviewed", "reviewed"],
    "default": "not_reviewed"
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});
bookingSchema.virtual("review_id", {
  ref: "Review",
  localField: "_id",
  foreignField: "booking_id",
  justOne: true
});
bookingSchema.set("toObject", {
  virtuals: true
});
bookingSchema.set("toJSON", {
  virtuals: true
});
var Booking = model("Booking", bookingSchema);
module.exports = {
  Booking: Booking
};