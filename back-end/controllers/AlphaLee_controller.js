const Client = require("../models/clients");
const Admins = require("../models/admin");
const Coach = require("../models/coaches");
const AlphaLee = require("../models/AlphaLee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const getDetails = async (req, res, next) => {
  try {
    const details = await AlphaLee.find();
    res.status(200).send(details);
  } catch (error) {
    return next(error);
  }
};

exports.getDetails = getDetails;
