const Client = require("../models/clients");
const Admins = require("../models/admin");
const Coach = require("../models/coaches");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

//regidter as a normal user

const registerClient = async (req, res, next) => {
  const { password, email } = req.body;

  let user;
  try {
    user = await Client.findOne({ email: email });

    // if not found, try to find the user in the coaches collection
    if (!user) {
      user = await Coach.findOne({ email: email });
    }

    if (!user) {
      user = await Admins.findOne({ email: email });
    }

    if (user) return next(createError(409, "User already exists"));

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new Client({
      ...req.body,
      password: hashedPassword,
      role: "Client",
    });

    await newUser.save();

    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Congrats! Registration Successful on Alpha Lee Fitness",
      html: `
        <html>
          <body>
            <h2 style="color: rgb(5, 218, 94);">Congratulations! You Have Successfully Registered on Alpha Lee Fitness</h2>
            <p>
              Congrats! You have successfully registered on Alpha Lee Fitness platform. We are thrilled to have you join us to access a wide range of high-quality coaching services.
            </p>
            <p>
              Brighten your future with us and take important steps towards building a healthier body and achieving your fitness goals.
            </p>
            <p>
              If you have any questions or require assistance, please feel free to contact us at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>. Our team will be more than happy to assist you.
            </p>
            <p>
              Once again, congratulations on becoming part of the Alpha Lee Fitness community! We look forward to supporting you on your successful journey.
            </p>
            <p>
              Kind regards,
              <br>
              Alpha Lee Fitness
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
    res.status(201).send("New user has been created!");
  } catch (err) {
    next(err);
  }
};

// register as a coach
const registerCoach = async (req, res, next) => {
  const { password, email } = req.body;

  let user;
  try {
    user = await Client.findOne({ email: email });
    // // if not found, try to find the user in the coaches collection
    if (!user) {
      user = await Coach.findOne({ email: email });
    }

    if (!user) {
      user = await Admins.findOne({ email: email });
    }

    if (user) return next(createError(409, "User already exists"));

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = new Coach({
      ...req.body,
      password: hashedPassword,
      role: "Coach",
      isAcceptedSeller: false,
      isAppliedAsSeller: false,
    });
    await newUser.save();

    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Congrats! Coach Registration Successful on Alpha Lee Fitness",
      html: `
        <html>
          <body>
            <h2 style="color: rgb(5, 218, 94);">Congratulations! You Have Successfully Registered as a Coach on Alpha Lee Fitness</h2>
            <p>
              Congratulations! You have successfully registered as a coach on the Alpha Lee Fitness platform. We are delighted to have you join us and contribute to our mission of providing top-quality coaching services to our users.
            </p>
            <p>
              Welcome to the Alpha Lee Fitness community! We are here to support you on your journey towards success. Together, we can make a positive impact on the lives of our users and help them achieve their fitness goals.
            </p>
            <p>
              If you have any questions or require any assistance, please feel free to reach out to us at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>. Our dedicated team is ready to provide you with the necessary support.
            </p>
            <p>
              Next Steps:
              <ol>
                <li>Log in to your account.</li>
                <li>Click on your profile picture to open the dropdown menu.</li>
                <li>Select "Seller Application" from the options.</li>
                <li>Fill out the application form with the required details.</li>
                <li>Submit the application and wait for our team to review it.</li>
              </ol>
            </p>
            <p>
              Once again, congratulations on becoming part of the Alpha Lee Fitness team of coaches! We have faith in your expertise and look forward to your valuable contributions in guiding and motivating our users towards a healthier lifestyle.
            </p>
            <p>
              Best regards,
              <br>
              Alpha Lee Fitness
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
    res.status(201).send("New user has been created!");
  } catch (err) {
    next(err);
  }
};

// register as a admin
const registerAdmin = async (req, res, next) => {
  const { password, email } = req.body;

  let user;
  try {
    user = await Client.findOne({ email: email });

    // if not found, try to find the user in the coaches collection
    if (!user) {
      user = await Coach.findOne({ email: email });
    }

    if (!user) {
      user = await Admins.findOne({ email: email });
    }

    if (user) return next(createError(409, "User already exists"));

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new Admins({
      ...req.body,
      password: hashedPassword,
      role: "Admin",
    });

    await newUser.save();

    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Welcome! New Admin Added to Alpha Lee Fitness",
      html: `
        <html>
          <body>
            <h2 style="color: rgb(5, 218, 94);">Welcome! A New Admin Has Been Added to Alpha Lee Fitness</h2>
            <p>
              Congratulations! We are pleased to inform you that a new admin has been added to the Alpha Lee Fitness platform. This addition will strengthen our team and enhance our ability to provide excellent services to our valued users.
            </p>
            <p>
              As an admin, you play a vital role in managing and overseeing the operations of our platform. Your expertise and dedication will contribute to the success and growth of Alpha Lee Fitness.
            </p>
            <p>
              If you have any questions or require any assistance, please feel free to reach out to us at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>. Our team is here to support you in your new role.
            </p>
            <p>
              Once again, welcome to the Alpha Lee Fitness team of admins! We appreciate your commitment and look forward to working together to create an exceptional experience for our users.
            </p>
            <p>
              Best regards,
              <br>
              Alpha Lee Fitness
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

    res.status(201).send("New user has been created!");
  } catch (err) {
    next(err);
  }
};

// login user

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // try to find the user in the clients collection
    let user = await Client.findOne({ email: email });

    // if not found, try to find the user in the coaches collection
    if (!user) {
      user = await Coach.findOne({ email: email });
    }

    if (!user) {
      user = await Admins.findOne({ email: email });
    }

    if (!user) return next(createError(404, "User Not found"));

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return next(
        createError(400, "Wrong password or username.Please try again!")
      );

    const token = jwt.sign(
      {
        id: user._id,
        userRole: user.role,
      },
      "supersecret_dont_share"
    );

    // to prevent send password to the user.send details without password
    const { password, ...info } = user._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

// logout user
const logoutUser = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none", //because front end in another port and backend in another port
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};

// change new pwd
const resetPwd = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  let user;
  let userEmail;

  jwt.verify(token, "supersecret_dont_share", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    let { email } = decoded;
    userEmail = email;
  });

  try {
    user = await Client.findOne({
      _id: id,
      email: userEmail,
    });

    if (!user) {
      user = await Coach.findOne({
        _id: id,
        email: userEmail,
      });
    }
    if (!user) {
      user = await Admins.findOne({
        _id: id,
        email: userEmail,
      });
    }

    if (!user) {
      return next(createError(404, "user Not found"));
    }
    const newPassword = await bcrypt.hash(password, 12);
    let setNewuserPass;

    //update here for avoid last password again
    // const isSamePassword = await bcrypt.compare(newPassword, password);

    // if (isSamePassword) {
    //   return next(
    //     createError(
    //       400,
    //       "New password must be different from the last password"
    //     )
    //   );
    // }
    setNewuserPass = await Client.findOneAndUpdate(
      { _id: id },
      { password: newPassword },
      { new: true }
    );
    if (!setNewuserPass) {
      setNewuserPass = await Coach.findOneAndUpdate(
        { _id: id },
        { password: newPassword },
        { new: true }
      );
    }
    if (!setNewuserPass) {
      setNewuserPass = await Admins.findOneAndUpdate(
        { _id: id },
        { password: newPassword },
        { new: true }
      );
    }

    setNewuserPass.save();

    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: userEmail,
      subject: "Important! Your Password Has Been Changed",
      html: `
        <html>
          <body>
            <h2 style="color: #dc2f02;">Important! Your Password Has Been Changed</h2>
            <p>
              Dear User,
            </p>
            <p>
              We are writing to inform you that your password for your Alpha Lee Fitness account has been changed. This email is to ensure the security and privacy of your account.
            </p>
            <p>
              If you did not initiate this change or if you believe your account has been compromised, please contact us immediately at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>. Our team will assist you in resolving any issues and securing your account.
            </p>
            
           
            <p>
              If you have any further questions or concerns, please do not hesitate to reach out to us at <a href="mailto:bitlegioninfo@gmail.com">bitlegioninfo@gmail.com</a>. Our team is here to support you in your new role.
            </p>
            <p>
              Best regards,
              <br>
              Alpha Lee Fitness
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

    return res.status(200).send("password has been updated");
  } catch (err) {
    next(err);
  }
};
exports.registerClient = registerClient;
exports.registerCoach = registerCoach;
exports.registerAdmin = registerAdmin;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;

exports.resetPwd = resetPwd;
