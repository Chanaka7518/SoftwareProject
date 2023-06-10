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
  if (req.userRole !== "Admin") {
    return next(createError(401, "You are not authorized!"));
  }
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

  if (req.userRole !== "Admin") {
    return next(createError(401, "You are not authorized!"));
  }

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
      html: `
      <html>
        <body>
          <h2 style="color: #008000;">Seller Account Approved</h2>
          <p>
            Congratulations! Your seller account application has been approved.
          </p>
          <p>
            <strong>Description:</strong> We are pleased to inform you that your application has successfully met our requirements. You can now start selling on our platform.
          </p>
          <p>
            To access your account and begin selling your services, <span style="color: #FF0000;">please sign out and then log in again using your credentials</span>. This will ensure that all the necessary permissions and settings are updated for your approved seller account.
          </p>
          <p>
            Should you encounter any issues or have any questions, please don't hesitate to contact our support team at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>. They will be happy to assist you.
          </p>
          <p>
            We appreciate your partnership and look forward to your successful selling journey on Alpha Lee Fitness.
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
  const { email } = req.body;

  if (req.userRole !== "Admin") {
    return next(createError(401, "You are not authorized!"));
  }

  try {
    coach = await Coach.find({ _id: req.params.id });
    if (!coach) {
      return next(createError(401, "User Not Found"));
    }

    await Coach.findByIdAndUpdate(req.params.id, {
      isAcceptedSeller: false,
    });

    // send a mail with link
    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Seller Account Rejection",
      html: `
      <html>
        <body>
        <h2 style="color: #FF0000;">Seller Account Rejection</h2>
          <p>
            We regret to inform you that your seller account application has been rejected.
          </p>
          <p>
            <strong>Reason for Rejection:</strong> After careful review of your application, we have determined that your account does not meet our requirements at this time.
          </p>
          <p>
            <strong>Next Steps:</strong> If you believe there has been a mistake or if you have made significant changes to your business that may now meet our requirements, please feel free to contact our support team at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>. They will assist you with the re-evaluation process.
          </p>
          <p>
            We appreciate your interest in becoming a seller on our platform and encourage you to apply again in the future if your circumstances change.
          </p>
          <p>
            Thank you for considering Alpha Lee Fitness as your selling platform.
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

    res
      .status(200)
      .send(
        "Seller application has been rejected and An email has sent to the Coach"
      );
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }
};

exports.getSellerApplications = getSellerApplications;
exports.acceptApplication = acceptApplication;
exports.rejectApplication = rejectApplication;
