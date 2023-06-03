const express = require("express");
const Users = require("../controllers/user_controller");
const verifyToken = require("../middleware/jwt");
const router = express.Router();

router.delete("/:id", verifyToken, Users.deleteUser);

module.exports = router;
