const express=require ("express");
const verifyToken = require("../middleware/jwt");
const Order = require  ("../controllers/order_controller.js")


const router = express.Router();


// me
router.post("/:gigId",verifyToken,Order.createOrder)
// router.get("/", verifyToken , Order.getOrders)
// me


// router.get("/test", deleteUser.deleteUser);
module.exports = router;
