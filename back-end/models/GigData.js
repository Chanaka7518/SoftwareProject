const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GigSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    totalRating: {
      type: Number,

      default: 0,
    },
    starNumber: {
      type: Number,

      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    gigPhoto: {
      type: String,
      required: false,
    },
    price: {
      platinum: {
        type: Number,
        required: true,
      },
      gold: {
        type: Number,
        required: true,
      },
      silver: {
        type: Number,
        required: true,
      },
      bronze: {
        type: Number,
        required: true,
      },
    },

    features: {
      type: [String],
      required: true,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    ongoingOrders: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gig", GigSchema);
