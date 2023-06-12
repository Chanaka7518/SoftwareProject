const Client = require("../models/clients");
const Admins = require("../models/admin");
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
    email,
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

  // send a mail with link
  const mailOptions = {
    from: "bitlegioninfo@gmail.com",
    to: email,
    subject: "Seller account approval",
    html: `
        <html>
        <body>
          <h2 style="color: #008000;">Application Received</h2>
          <p>
            Dear seller,
          </p>
          <p>
            Thank you for submitting your application. We have successfully received it and it is currently being reviewed. Please note that the review process may take up to 72 hours to complete.
          </p>
          <p>
            If you have any questions or require any assistance, please feel free to contact our support team at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>. Our dedicated team is available to provide any help you may need.
          </p>
          <p>
            We appreciate your patience and look forward to the possibility of partnering with you on Alpha Lee Fitness.
          </p>
        </body>
      </html>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error: ", error);
      return next(createError(500, "Email was not sent"));
    } else {
      console.log("Email sent", info.response);
    }
  });

  res.status(200).send("Your application has sent for the review");
};

exports.deleteUser = deleteUser;
exports.getCoaches = getCoaches;
exports.getCoach = getCoach;
exports.fillApplication = fillApplication;
