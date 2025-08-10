const { model, Schema } = require("mongoose");

const partnerSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    description: String,
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    link_map: {
      type: String,
      required: true,
    },

    profile_image: String,
  },
  {
    timestamps: true,
  }
);

partnerSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const partnerId = this._id;
    await model("Service").deleteMany({ partner_id: partnerId });
    await model("Booking").deleteMany({ partner_id: partnerId });
    await model("Review").deleteMany({ partner_id: partnerId });
    await model("TimelineTracker").deleteMany({ partner_id: partnerId });
    next();
  }
);

const Partner = model("Partner", partnerSchema);

module.exports = { Partner };
