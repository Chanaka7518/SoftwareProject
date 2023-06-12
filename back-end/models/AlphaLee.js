const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlphaLeeDetails = new Schema(
  {
    numberOfAdmins: {
      type: Number,
      default: 1,
    },
    numberOfClients: {
      type: Number,
      default: 1,
    },
    numberOfCoaches: {
      type: Number,
      default: 1,
    },
    revenue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AlphaLeeDetails", AlphaLeeDetails);
