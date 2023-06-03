const express = require("express");
const Gig = require("../controllers/gigdata_controller");
const verifyToken = require("../middleware/jwt");
const router = express.Router();

router.post("/", verifyToken, Gig.createGig);
router.delete("/:id", verifyToken, Gig.deleteGig);
router.get("/single/:id", verifyToken, Gig.getGig);
router.get("/", verifyToken, Gig.getGigs);
module.exports = router;
