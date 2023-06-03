const express = require("express");
const Review = require("../controllers/review_controller");
const verifyToken = require("../middleware/jwt");
const router = express.Router();

router.post("/", verifyToken, Review.createReview);
router.get("/:id", verifyToken, Review.getReviews);
router.delete("/:id", verifyToken, Review.deleteReview);
module.exports = router;
