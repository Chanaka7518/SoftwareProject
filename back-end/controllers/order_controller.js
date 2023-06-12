const Order = require("../models/Order");
const createError = require("../utils/createError");
const Gig = require("../models/GigData.js");
const Client = require("../models/clients");
const Coach = require("../models/coaches");
const AlphaLee = require("../models/AlphaLee");

const createOrder = async (req, res, next) => {
  try {
    if (req.userRole !== "Client") {
      return next(
        createError(401, "You are not authorized to ctreate an order")
      );
    }

    const gig = await Gig.findById(req.params.gigId);

    const { package, price } = req.body;
    const newOrder = new Order({
      gigId: gig._id.toString(),
      image: gig.gigPhoto,
      title: gig.Title,
      BuyerId: req.userId,
      sellerId: gig.sellerId,
      Price: price,
      package: package,
      payment_intent: "temporary",
    });
    const order = await newOrder.save();
    const revenueForCoach = price * 0.8;
    const revenueForAlphaLee = price * 0.2;

    await Coach.findByIdAndUpdate(order.sellerId, {
      $inc: { revenue: revenueForCoach, totalSales: 1 },
      $push: { newOrders: order._id.toString() },
    });
    await Client.findByIdAndUpdate(req.userId, {
      $push: { orders: order._id.toString() },
    });
    await AlphaLee.updateOne({
      $inc: { revenue: revenueForAlphaLee },
    });

    res.status(200).send("Your order has completed");
  } catch (err) {
    next(err);
  }
};
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%My%%%%%%%%%%%%%%%%%%

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return next(createError(404, "Order Not found"));
    const coach = await Coach.findById(order.sellerId);
    const client = await Client.findById(order.BuyerId);

    const orderDetails = {
      title: order.title,
      package: order.package,
      buyerName: client.firstName,
      buyerEmail: client.email,
      sellerEmail: coach.email,
      sellerId: order.sellerId,
      sellerName: coach.firstName,
      price: order.Price,
      isDeliveredToClient: order.isDeliveredToClient,
    };

    res.status(200).send(orderDetails);
  } catch (err) {
    next(err);
  }
};
const getOrders = async (req, res, next) => {
  try {
    console.log();
    const orders = await Order.find({ BuyerId: req.params.userId });
    if (!orders) return next(createError(404, "You have no orders"));
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  const { sellerId, workoutLink } = req.body;
  try {
    await Order.findByIdAndUpdate(req.params.orderId, {
      isDeliveredToClient: true,
      workoutLink: workoutLink,
    });

    await Coach.findByIdAndUpdate(sellerId, {
      $pull: { newOrders: req.params.orderId },
    });
    res.send("Order has delivered successfully");
  } catch (error) {
    next(err);
  }
};

exports.getOrder = getOrder;
exports.getOrders = getOrders;
exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
