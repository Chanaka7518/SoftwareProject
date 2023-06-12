const express = require("express");

const verifyToken = require("../middleware/jwt");
const router = express.Router();
const Email = require("../controllers/email_controller");

router.post("/registerCoach", Email.generateLink);

module.exports = router;
