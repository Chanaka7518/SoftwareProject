const Client = require("../models/clients");
const Admins = require("../models/admin");
const Coach = require("../models/coaches");
const createError = require("../utils/createError");

const deleteUser = async (req, res, next) => {
  // try to find the user in the clients collection
  let user = await Client.findById(req.params.id);

  // if not found, try to find the user in the coaches collection
  if (!user) {
    user = await Coach.findById(req.params.id);
  }

  if (!user) {
    user = await Admins.findById(req.params.id);
  }

  // if not verified, this return error and if verified it return payload
  console.log(user);
  if (user === null || req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }

  if (await Admins.findById(req.params.id)) {
    await Admins.findByIdAndDelete(req.params.id);
  } else if (await Client.findById(req.params.id)) {
    await Client.findByIdAndDelete(req.params.id);
  } else if (await Coach.findById(req.params.id)) {
    await Coach.findByIdAndDelete(req.params.id);
  }

  res.status(200).send("User deleted");
};

exports.deleteUser = deleteUser;
