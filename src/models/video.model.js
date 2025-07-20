const { model, Schema } = require("mongoose");

const videoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url_thumbnail: {
      type: String,
      required: true,
    },
    url_video: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Video = model("Video", videoSchema);

module.exports = { Video };
