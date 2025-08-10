"use strict";

var _require = require("mongoose"),
  model = _require.model,
  Schema = _require.Schema;
var reviewSchema = new Schema({
  booking_id: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  partner_id: {
    type: Schema.Types.ObjectId,
    ref: "Partner",
    required: true
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
});
var Review = model("Review", reviewSchema);
module.exports = {
  Review: Review
};