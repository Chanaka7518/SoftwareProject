const express = require("express");
const Approvements = require("../controllers/approve_controller");
const router = express.Router();

router.get("/applications", Approvements.getSellerApplications);
router.post("/application/:id", Approvements.acceptApplication);
router.post("/application/reject/:id", Approvements.rejectApplication);

module.exports = router;
