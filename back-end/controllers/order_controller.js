const Order = require ("../models/Order");
const createError = require ("../utils/createError");
const Gig  = require ("../models/GigData.js");
const Client = require("../models/clients");

const createOrder = async (req,res,next)=>{
  try{

    if(req.userRole !== 'Client'){
      return next(createError(401,"You are not authorizes to ctreate an order"))
    }
    const gig = await Gig.findOne({_id: req.params.gigId});

console.log(gig)

    const newOrder =new Order({
      gigId:gig._id,
      image: gig. gigPhoto,
      title: gig.Title,
      BuyerId:req.userId,
      sellerId:gig.sellerId,
      Price:25000,// hard coded
      package:"platinum",
      
      payment_intent:"temporary",

    });

    await newOrder.save();
    await Client.findByIdAndUpdate(req.userId,
      { $push: { orders: newOrder._id } },
    )

    res.status(200).send("Your order has completed")

  }catch(err){
    next(err)
  }



}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%My%%%%%%%%%%%%%%%%%%
// order_controller.js

// Import necessary dependencies and models

// Define the getOrders function


// const getOrder = (req, res) => {


  // Logic to fetch orders from the database or perform other operations
  // ...
  // Return the response


//   res.send("Get all orders");
// };


const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.userId);
    if (!order) return next(createError(404, "Order Not found"));
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};
const getOrders = async (req, res, next) => {
  try {
    console.log()
    const orders= await Order.find({BuyerId:req.params.userId});
    if (!orders) return next(createError(404, "You have no orders"));
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};






exports.getOrder = getOrder;
exports.getOrders = getOrders;
exports.createOrder = createOrder;

