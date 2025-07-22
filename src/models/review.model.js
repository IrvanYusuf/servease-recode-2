const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    booking_id: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    partner_id: {
      type: Schema.Types.ObjectId,
      ref: "Partner",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      maxlength: 500,
    },

    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);

module.exports = { Review };
