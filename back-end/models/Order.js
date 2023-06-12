const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },

    title: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    BuyerId: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      enum: ["platinum", "gold", "silver", "bronze"],
      required: true,
    },
    IsCompleted: {
      type: Boolean,
      default: false,
    },
    IsWorkoutDeliveredToClient: {
      type: Boolean,
      default: false,
    },
    workoutLink: {
      type: String,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
