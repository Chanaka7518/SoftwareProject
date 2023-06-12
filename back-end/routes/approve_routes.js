const express = require("express");
const Approvements = require("../controllers/approve_controller");
const router = express.Router();
const verifiToken = require("../middleware/jwt");

router.get("/applications", verifiToken, Approvements.getSellerApplications);
router.post("/application/:id", verifiToken, Approvements.acceptApplication);
router.post(
  "/application/reject/:id",
  verifiToken,
  Approvements.rejectApplication
);

module.exports = router;
