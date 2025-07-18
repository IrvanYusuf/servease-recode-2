const { model, Schema } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url_icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = model("Service", serviceSchema);

module.exports = { Service };
