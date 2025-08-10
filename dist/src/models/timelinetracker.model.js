"use strict";

var _require = require("mongoose"),
  model = _require.model,
  Schema = _require.Schema;
var timelineTrackerSchema = new Schema({
  booking_id: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
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
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    "enum": ["booked", "confirmed", "completed", "cancelled", "payment"],
    "default": "booked"
  },
  tracker: {
    booked_at: {
      type: Date,
      "default": Date.now
    },
    confirmed_at: {
      type: Date
    },
    completed_at: {
      type: Date
    },
    cancelled_at: {
      type: Date
    },
    payment_at: {
      type: Date
    }
  },
  // optional fields
  notes: {
    type: String
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});
var TimelineTracker = model("TimelineTracker", timelineTrackerSchema);
module.exports = {
  TimelineTracker: TimelineTracker
};