const createError = require("../utils/createError");
const Review = require("../models/Review");
const Client = require("../models/clients");
const Gig = require("../models/GigData");
const Coach = require("../models/coaches");
const nodemailer = require("nodemailer");

//--------Email Configurations-----------------------

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bitlegioninfo@gmail.com",
    pass: "ayzggsrtobpayzuh",
  },
});

//-------------Create Review---------------
const createReview = async (req, res, next) => {
  if (req.userRole === "Coach" || req.userRole === "Admin")
    return next(createError(403, `${req.userRole}s can't create a review`));

  const gig = await Gig.findById(req.body.gigId);
  if (!gig) return next(createError(404, "Gig not found"));
  console.log("hellooo");
  const newReview = new Review({
    userId: req.userId,
    reviewerName: req.body.reviewerName,
    gigId: req.body.gigId,
    sellerId: gig.sellerId,
    des: req.body.des,
    star: req.body.star,
  });
  let email;
  try {
    const user = await Client.findById(req.userId);
    email = user.email;

    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review)
      return next(
        createError(403, "You have already created a review for this gig")
      );
    //update number of reviews for coach
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalRating: 1, starNumber: req.body.star },
    });

    await newReview.save();

    const existingReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    console.log(gig.sellerId);
    await Coach.findByIdAndUpdate(
      { _id: gig.sellerId },
      {
        $inc: { totalRatings: 1, totalStars: req.body.star },
        $push: { reviewIds: existingReview._id.toString() },
      }
    );

    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Thank You for Your Review",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h3 style="color: #007bff;">Dear User,</h3>
          <p>We would like to express our sincerest gratitude for taking the time to provide us with your valuable review.</p>
          <p>Your feedback is highly appreciated and plays a crucial role in helping us improve our services and enhance the experience for all our users.</p>
          <p style="color: #777;">We are constantly striving to deliver the best possible experience, and your review helps us in that endeavor.</p>
          <p>If you have any further feedback, suggestions, or questions, please do not hesitate to reach out to us at <a href="mailto:bitlegioninfo@gmail.com" style="color: #007bff;">bitlegioninfo@gmail.com</a>.</p>
          <p>Once again, thank you for your support and for being a valued member of our community.</p>
          <p>Best regards,</p>
          <p style="color: #007bff;">The BitLegion Team</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: ", error);
        res.status(424).send("Email was not sent");
      } else {
        console.log("Email sent", info.response);
        res.status(200).send("Password reset link was  sent successfully");
      }
    });
    res.status(201).send("Review has been created");
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.body.gigId });

    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
const getReviewsByCoachId = async (req, res, next) => {
  try {
    const reviews = await Review.find({ sellerId: req.params.coachId });
    if (reviews.length === 0) return res.status(200).send("No reviews yet");

    res.status(200).send(reviews);
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
exports.getReviewsByCoachId = getReviewsByCoachId;
