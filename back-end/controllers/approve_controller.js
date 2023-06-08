const Coach = require("../models/coaches");
const createError = require("../utils/createError");
const nodemailer = require("nodemailer");

//-----------------------------Email configuration ---------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bitlegioninfo@gmail.com",
    pass: "ayzggsrtobpayzuh",
  },
});

// Get seller applications for admins

const getSellerApplications = async (req, res, next) => {
  let applicants;
  try {
    applicants = await Coach.find({ isAppliedAsSeller: true });
    if (applicants) {
      return res.status(200).send(applicants);
    }
    res.status(200).send("There is no applications remaining");
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }
};

// accept application
const acceptApplication = async (req, res, next) => {
  let coach;
  const { email } = req.body;

  try {
    coach = await Coach.find({ _id: req.params.id });
    if (!coach) {
      return next(createError(401, "User Not Found"));
    }

    await Coach.findByIdAndUpdate(req.params.id, {
      isAcceptedSeller: true,
    });

    // send a mail with link
    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Seller account approval",
      text: "Your seller account has been approved. Please Signout and login to your account.",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: ", error);
        return next(createError(500, "Email was not sent"));
      } else {
        console.log("Email sent", info.response);
      }
    });
    res
      .status(200)
      .send(
        "Seller application has been Approved and An email has been sent to the Coach"
      );
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }
};

// reject Applicaion

const rejectApplication = async (req, res, next) => {
  let coach;

  try {
    coach = await Coach.find({ _id: req.params.id });
    if (!coach) {
      return next(createError(401, "User Not Found"));
    }

    await Coach.findByIdAndUpdate(req.params.id, {
      isAcceptedSeller: false,
    });

    res.status(200).send("Seller application has been rejected");
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }
};

exports.getSellerApplications = getSellerApplications;
exports.acceptApplication = acceptApplication;
exports.rejectApplication = rejectApplication;
