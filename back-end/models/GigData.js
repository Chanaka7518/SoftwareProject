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
      // when create a review increment the starNumebr by star.Then calculate average using both package
      type: Number,

      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    gigPhoto: {
      type: String,
      required: true,
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
