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
      required: true,
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

    socialMediaAccounts: [String],

    certifictes: {
      urls: { type: String },
      pdfData: [Schema.Types.Mixed],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coach", coacheSchema);
