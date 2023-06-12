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
      html: `
      <div>
        <p style="color:rgb(5, 218, 94); font-size:24px;">Thank you for choosing Alpha Lee Fitness as your selling platform and starting a new journey as a coach!</p>
        <p>Click the button below to register:</p>
        <p>
          <a style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 4px;" href="http://localhost:3000/signupCoach/${token}">
          Register Now
          </a>
        <p/>
        <p>If you have any problems, please contact us at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>.</p>
      </div>
    `,
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

const generateLinkForPwdReset = async (req, res, next) => {
  const { email } = req.body;
  let user;

  try {
    user = await Client.findOne({ email: email });

    if (!user) {
      user = await Coach.findOne({ email: email });
    }
    if (!user) {
      user = await Admins.findOne({ email: email });
    }
    if (!user) {
      return next(createError(401, "User not found"));
    }

    const token = jwt.sign({ email: user.email }, "supersecret_dont_share", {
      expiresIn: "1d",
    });

    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Sending Email for reset password",
      html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h3 style="color: #007bff;">Dear User,</h3>
      <p>This email is to inform you that a password reset request has been initiated for your account.</p>
      <p style="color: #777;">If you did not request this password reset, please ignore this email.</p>
      <p>Click on the link below to reset your password:</p>
      <p><a href="http://localhost:3000/newPassword/${user._id}/${token}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 4px;">Reset Password</a></p>
      <p style="color: #777;">For further assistance or any questions, please contact us at <a href="mailto:bitlegioninfo@gmail.com" style="color: #007bff;">bitlegioninfo@gmail.com</a>.</p>
      <p>Thank you,</p>
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
  } catch (err) {
    next(err);
  }
};

const emailToAlphaLee = (req, res, next) => {
  const { email, whatsApp, name, message } = req.body;
  try {
    const mailOptions = {
      from: email,
      to: "bitlegioninfo@gmail.com",
      subject: "Contact Alpha Lee",
      html: `
      <div style="font-family: Arial, sans-serif;">
        <p style="font-weight: bold;">Name: </p> <span style="color: #333;">${name}</span>
        <p style="font-weight: bold;">WhatsApp :</p> <a href="tel:${whatsApp}">${whatsApp}</a>
        <p style="font-weight: bold;">Email :</p> <a  href="mailto:${email}">${email}</a>
        <p style="font-weight: bold;">Message: </p>
        <p>${message}</p>
      </div>
    `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: ", error);
        return res.status(424).send("Email was not sent");
      } else {
        console.log("Email sent", info.response);
      }
    });
    res.status(200).send("Email was  sent successfully");
  } catch (err) {
    return next(err);
  }
};

exports.generateLink = generateLink;
exports.generateLinkForPwdReset = generateLinkForPwdReset;
exports.emailToAlphaLee = emailToAlphaLee;
