// order_routes.js

const express = require("express");
const verifyToken = require("../middleware/jwt");
const Order = require("../controllers/order_controller");

const router = express.Router();

// Get all orders
// router.get("/", verifyToken, Order.getOrders);

// Create an order
router.post("/:userId",  Order.createOrder);
router.get("/:userId",  Order.getOrders);

// Get a single order
router.get("/single/:orderId",  Order.getOrder);

module.exports = router;
