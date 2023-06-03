const createError = require("../utils/createError");
const Review = require("../models/Review");

//-------------Create Review---------------
const createReview = async (req, res, next) => {
  if (req.userRole === "Coach" || req.userRole === "Admin")
    return next(createError(403, `${req.userRole}s can't create a review`));
  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = Review.findOne({
      gigId: req.userId,
      userId: req.userId,
    });
    if (review)
      return next(
        createError(403, "You have already created a review for this gig")
      );
    const savedReview = await newReview.save();
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};
const getReviews = (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
const deleteReview = (req, res, next) => {
  try {
  } catch (err) {}
};
exports.createReview = createReview;
exports.getReviews = getReviews;
exports.deleteReview = deleteReview;
