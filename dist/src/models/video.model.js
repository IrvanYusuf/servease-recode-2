"use strict";

var _require = require("mongoose"),
  model = _require.model,
  Schema = _require.Schema;
var videoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url_thumbnail: {
    type: String,
    required: true
  },
  url_video: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var Video = model("Video", videoSchema);
module.exports = {
  Video: Video
};