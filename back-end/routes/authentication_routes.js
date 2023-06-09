const express = require("express");
const Auth = require("../controllers/auth_controller");
const router = express.Router();

router.post("/register/client", Auth.registerClient);
router.post("/register/coach", Auth.registerCoach);
router.post("/register/admin", Auth.registerAdmin);
router.post("/login", Auth.loginUser);
router.post("/logout", Auth.logoutUser);

router.post("/password-reset/:id/:token", Auth.resetPwd);
module.exports = router;
