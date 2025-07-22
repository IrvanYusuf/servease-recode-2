const { Schema, model } = require("mongoose");

const paymentMethodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["cash", "bank_transfer"],
    required: true,
  },
  description: {
    type: String,
  },
  bank_logo: {
    type: String,
  },
  bank_name: {
    type: String, // Jika metode bank transfer
  },
  account_number: {
    type: String, // Jika metode bank transfer
  },
  account_holder: {
    type: String, // Jika metode bank transfer
  },
});

const PaymentMethod = model("PaymentMethod", paymentMethodSchema);

module.exports = { PaymentMethod };
