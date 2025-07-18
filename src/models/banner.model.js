const { model, Schema } = require("mongoose");

const bannerSchema = new Schema(
  {
    url_image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = model("Banner", bannerSchema);

module.exports = { Banner };
