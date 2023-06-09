const Client = require("../models/clients");
const Admins = require("../models/admin");
const Coach = require("../models/coaches");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

//regidter as a normal user

const registerUser = async (req, res, next) => {
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

    // if not found, try to find the user in the coaches collection
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
    });

    await newUser.save();
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
  } catch (e) {
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
exports.registerUser = registerUser;
exports.registerCoach = registerCoach;
exports.registerAdmin = registerAdmin;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
