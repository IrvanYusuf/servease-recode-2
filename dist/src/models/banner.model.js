"use strict";

var _require = require("mongoose"),
  model = _require.model,
  Schema = _require.Schema;
var bannerSchema = new Schema({
  url_image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var Banner = model("Banner", bannerSchema);
module.exports = {
  Banner: Banner
};