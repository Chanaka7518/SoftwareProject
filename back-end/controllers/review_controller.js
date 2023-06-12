const createError = require("../utils/createError");
const Review = require("../models/Review");
const Gig = require("../models/GigData");

//-------------Create Review---------------
const createReview = async (req, res, next) => {
  if (req.userRole === "Coach" || req.userRole === "Admin")
    return next(createError(403, `${req.userRole}s can't create a review`));
  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    des: req.body.des,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    console.log(review);
    if (review)
      return next(
        createError(403, "You have already created a review for this gig")
      );
    const savedReview = await newReview.save();
    res.status(201).send(savedReview);
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalRating: req.body.star, starNumber: 1 },
    });
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.body.gigId });
    res.status(201).send(reviews);
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
