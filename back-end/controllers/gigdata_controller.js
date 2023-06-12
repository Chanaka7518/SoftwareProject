const Gig = require("../models/GigData");
const createError = require("../utils/createError");

const createGig = async (req, res, next) => {
  // req.userRole comes from token

  if (req.userRole !== "Coach") {
    return next(createError(403, "Only sellers can create a service"));
  }

  const newGig = new Gig({
    sellerId: req.userId, // from jwt verification file
    ...req.body,
  });
  console.log("hi");
  try {
    const savedGig = await newGig.save();
    res.status(201).send("Gig has been successfully created");
  } catch (err) {
    next(err);
  }
};

const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gig.sellerId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    return res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig Not found"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
const getGigByUserId = async (req, res, next) => {
  const category = req.query.category;

  if (req.userId !== req.params.userId && req.userRole !== "Coach") {
    return next(createError(401, "You are not authorized"));
  }

  const filters = {
    category: category,
    sellerId: req.params.userId,
  };
  try {
    const gig = await Gig.findOne(filters);

    if (!gig) return res.status(404).send("You have not created a gig yet");
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

// To get all the gigs

const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    //if there is no category, this will return the all gigs
    ...(q.category && { category: q.category }),
    ...(q.sellerId && { sellerId: q.sellerId }),
  };

  try {
    const gigs = await Gig.find(filters);
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

const updateGig = async (req, res, send) => {
  const { Title, des } = req.body;
  const gigId = req.params.gigId;

  try {
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return next(createError(404, "Gig not found"));
    }
    await Gig.findByIdAndUpdate(gigId, {
      Title: Title,
      des: des,
    });
    res.status(200).send("Gig has been updated");
  } catch (err) {
    next(err);
  }
};

exports.deleteGig = deleteGig;
exports.createGig = createGig;
exports.getGig = getGig;
exports.getGigByUserId = getGigByUserId;
exports.getGigs = getGigs;
exports.updateGig = updateGig;
