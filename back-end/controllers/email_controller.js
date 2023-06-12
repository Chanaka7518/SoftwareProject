const Client = require("../models/clients");
const Admins = require("../models/admin");
const Coach = require("../models/coaches");
const nodemailer = require("nodemailer");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

//--------Email Configurations-----------------------

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bitlegioninfo@gmail.com",
    pass: "ayzggsrtobpayzuh",
  },
});

//-------- generate link for headcoach register--------

const generateLink = async (req, res, next) => {
  const { email } = req.body;
  let user;

  try {
    user = await Client.findOne({ email: email });
    if (!user) {
      user = await Admins.findOne({ email: email });
    }
    if (!user) {
      user = await Coach.findOne({ email: email });
    }
    if (user) {
      return next(createError(409, "User Already Exists"));
    }

    const token = jwt.sign({ email: email }, "supersecret_dont_share", {
      expiresIn: "1d",
    });

    // send a mail with link
    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Sending Email For Registering As a Coach",
      text: `This link valid for 1 day http://localhost:3000/signupCoach/${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: ", error);
        return res.send({ message: "Email was not sent" });
      } else {
        console.log("Email sent", info.response);
        res.send({ message: "Email was  sent successfully" });
      }
    });
  } catch (err) {
    return next(createError(500, "Process faild! Try again"));
  }
};

exports.generateLink = generateLink;
