const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coacheSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    }, // check min length with backend
    address: {
      type: String,
    },
    nicNo: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    moNumber: {
      type: String,
      required: true,
    },
    whatsApp: {
      type: String,
      required: true,
    },
    lLine: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    webSite: {
      type: String,
    },
    athleticArchievements: [String],
    experiences: [String],
    role: {
      type: String,
      required: true,
    },

    facebook: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    instagram: {
      type: String,
    },

    certifictes: {
      urls: { type: String },
      pdfData: [Schema.Types.Mixed],
    },

    isAppliedAsSeller: {
      type: Boolean,
      required: true,
    },
    isAcceptedSeller: {
      type: Boolean,
      required: true,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    reviewIds: {
      type: [String],
    },
    newOrders: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coach", coacheSchema);
