"use strict";

var _require = require("mongoose"),
  model = _require.model,
  Schema = _require.Schema;
var categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url_icon: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var Category = model("Category", categorySchema);
module.exports = {
  Category: Category
};