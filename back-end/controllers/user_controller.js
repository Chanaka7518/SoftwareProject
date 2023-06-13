const Client = require("../models/clients");
const Admins = require("../models/admin");
const Coach = require("../models/coaches");
const createError = require("../utils/createError");
const { c } = require("tar");

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

//------------Get Coaches----------------------

const getCoaches = async (req, res, next) => {
  let coaches;
  try {
    coaches = await Coach.find();
    res.status(200).send(coaches);
  } catch (err) {
    return next(createError(500, "Internal Server Error!"));
  }
};
const getCoach = async (req, res, next) => {
  let coach;

  try {
    coach = await Coach.findById(req.params.id);

    res.status(200).send(coach);
  } catch (err) {
    return next(createError(500, "Internal Server Error!"));
  }
};

//------------fill application as a seller--------------------

const fillApplication = async (req, res, next) => {
  const {
    address,
    nicNo,
    webSite,
    athleticArchievements,
    experiences,
    facebook,
    tiktok,
    instagram,
  } = req.body;

  let coach;
  try {
    if (req.params.id !== req.userId) {
      return next(createError(401, "You are not authorized for this!"));
    }
    coach = await Coach.findOne({ _id: req.params.id });
    if (!coach) {
      return next(createError(404, "User not found"));
    }

    await Coach.findByIdAndUpdate(req.params.id, {
      address: address,
      nicNo: nicNo,
      webSite: webSite,
      athleticArchievements: athleticArchievements,
      experiences: experiences,
      facebook: facebook,
      tiktok: tiktok,
      instagram: instagram,
      isAppliedAsSeller: true,
      // add qualifications,
    });
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }

  res.status(200).send("Your application has sent for the review");
};

//Get Admin
const getAdmin = async (req, res, next) => {
  let admin;

  try {
    admin = await Admins.findById(req.params.id);
    res.status(200).send(admin);
  } catch (err) {
    return next(createError(500, "Internal Server Error!"));
  }
};

//Admin profile update
const editAdminProfile = async(req, res, next) => {
  const {firstName, lastName} = req.body;
  try { 
    const admin = await Admins.findById(req.userId);

    if(!admin) {
      return next(createError(404, "User not found"));
    }
    await Admins.findByIdAndUpdate(req.userId, {
      firstName: firstName, 
      lastName: lastName
    })
  } catch (err) {
    return next(err);
  }
  
 };

 //Admin contact update
const editAdminContact = async(req, res, next) => {
  const {moNumber} = req.body;
  try { 
    const admin = await Admins.findById(req.userId);

    if(!admin) {
      return next(createError(404, "User not found"));
    }
    await Admins.findByIdAndUpdate(req.userId, {
      moNumber: moNumber
    })
  } catch (err) {
    return next(err);
  }
  
 };

//Admin password update
const editAdminPassword = async(req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  
  
  
  try{
    const admin = await Admins.findById(req.userId);
    // Check if the current password is correct
  const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if(!admin) {
    return next(createError(404, "User not found"));
  }
  

  if (!isOldPasswordCorrect) {
    return next(createError(401, "Old password is incorrect."));
  }

  await Admins.findByIdAndUpdate(req.userId, {
    password: newPassword 
  })
  } catch (err) {
  return next(err);
  }
};


exports.deleteUser = deleteUser;
exports.getCoaches = getCoaches;
exports.getCoach = getCoach;
exports.getAdmin = getAdmin;
exports.fillApplication = fillApplication;
exports.editAdminProfile = editAdminProfile;
exports.editAdminContact = editAdminContact;
exports.editAdminPassword = editAdminPassword;

