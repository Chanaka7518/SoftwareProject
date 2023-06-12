const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const veryfyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, "supersecret_dont_share", (err, payload) => {
    if (err) return next(createError(403, "Token is not valid"));

    req.userId = payload.id;
    req.userRole = payload.userRole;
    next();
  });
};
module.exports = veryfyToken;
