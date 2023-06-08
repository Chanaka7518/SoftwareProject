const express = require("express");
const Users = require("../controllers/user_controller");
const verifyToken = require("../middleware/jwt");
const router = express.Router();

router.delete("/:id", verifyToken, Users.deleteUser);
router.get("/coaches", verifyToken, Users.getCoaches);
router.get("/coach/:id", verifyToken, Users.getCoach);

router.post("/coach/application/:id", verifyToken, Users.fillApplication);

module.exports = router;
