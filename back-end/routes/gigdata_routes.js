const express = require("express");
const Gig = require("../controllers/gigdata_controller");
const verifyToken = require("../middleware/jwt");
const router = express.Router();

router.post("/", verifyToken, Gig.createGig);
router.delete("/:id", verifyToken, Gig.deleteGig);
router.get("/single/:id", verifyToken, Gig.getGig);
router.post("/single/update/:gigId", verifyToken, Gig.updateGig);
router.get("/single/coach/:userId", verifyToken, Gig.getGigByUserId);
router.get("/", Gig.getGigs);
module.exports = router;
