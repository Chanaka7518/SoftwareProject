const express = require("express");
const Users = require("../controllers/user_controller");
const verifyToken = require("../middleware/jwt");
const router = express.Router();

router.delete("/:id", verifyToken, Users.deleteUser);
router.get("/coaches", verifyToken, Users.getCoaches);
router.get("/coach/:id", verifyToken, Users.getCoach);
router.get("/admin/:id" ,Users.getAdmin);
router.post("/coach/application/:id", verifyToken, Users.fillApplication);

// Admin profile updates
router.post('/adminProfile',Users.editAdminProfile);
router.post('/adminContact',Users.editAdminContact);
router.post('/adminPassword',Users.editAdminPassword);

module.exports = router;
