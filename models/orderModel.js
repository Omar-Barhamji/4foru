const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    typeOfApplication: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: String, required: true },
    image: { type: String },
    category: {
      type: String,
      enum: ["Web", "Android", "Games", "Desktop"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const order = mongoose.model("Order", orderSchema);
module.exports = Order;
