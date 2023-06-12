const express = require("express");

const verifyToken = require("../middleware/jwt");
const router = express.Router();
const Email = require("../controllers/email_controller");

router.post("/registerCoach", Email.generateLink);
router.post("/pwd-reset-link", Email.generateLinkForPwdReset);
router.post("/send-mail-to-contact", Email.emailToAlphaLee);

module.exports = router;
