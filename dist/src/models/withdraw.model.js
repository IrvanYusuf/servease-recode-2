"use strict";

var _require = require("mongoose"),
  model = _require.model,
  Schema = _require.Schema;
var withdrawSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Minimum withdraw is 1"]
  },
  admin_fee: {
    type: Number,
    required: true,
    min: [1, "Minimum admin fee is 1"]
  },
  status: {
    type: String,
    "enum": ["pending", "approved", "completed", "rejected", "cancelled"],
    "default": "pending"
  },
  payment_method: {
    type: String,
    "enum": ["bank_transfer", "e_wallet", "cash"],
    "default": "bank_transfer",
    required: true
  },
  bank_name: {
    type: String,
    required: true
  },
  account_name: {
    type: String,
    required: true
  },
  account_number: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    "default": ""
  },
  created_at: {
    type: Date
  },
  approved_at: {
    type: Date
  },
  rejected_at: {
    type: Date
  },
  cancelled_at: {
    type: Date
  },
  finished_at: {
    type: Date
  }
}, {
  timestamps: true
});
var Withdraw = model("Withdraw", withdrawSchema);
module.exports = {
  Withdraw: Withdraw
};