"use strict";

var _require = require("mongoose"),
  Schema = _require.Schema,
  model = _require.model;
var addressSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  label_alamat: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  street_name: {
    type: String,
    required: true
  },
  link_map: String,
  description: {
    type: String
  },
  isPrimary: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var Address = model("Address", addressSchema);
module.exports = {
  Address: Address
};