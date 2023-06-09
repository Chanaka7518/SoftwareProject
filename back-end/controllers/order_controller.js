const Order = require ("../models/Order");
const createError = require ("../utils/createError");
const Gig  = require ("../models/GigData.js");


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
      
      payment_intent:"temporary",

    });

    await newOrder.save();
    res.status(200).send("Successfull")

  }catch(err){
    next(err)
  }


}
const deleteUser = (req, res) => {
  res.send("Controller");
};
exports.deleteUser = deleteUser;
exports.createOrder = createOrder;

