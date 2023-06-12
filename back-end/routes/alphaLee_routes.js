const express = require("express");
const AlphaLee = require("../controllers/AlphaLee_controller");
const router = express.Router();
const verifiToken = require("../middleware/jwt");

router.get("/", verifiToken, AlphaLee.getDetails);
module.exports = router;
