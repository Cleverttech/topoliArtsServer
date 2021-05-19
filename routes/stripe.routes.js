const CoursesModel = require("../models/Courses.model");

const router = require("express").Router();

const stripe = require("stripe")("sk_test_51IpuIuH5gcnIJLr7b6pYLrYKESswGsgBcXT5yY3kkCvbwymLHcxYMbnZTxGoXdBLlFrydwKbHZMgia41FuoqFUzj000sMI9iPy");

const isLoggedIn = (req, res, next) => {  
  if (req.session.loggedInUser) {
      //calls whatever is to be executed after the isLoggedIn function is over
      next()
  }
  else {
      res.status(401).json({
          message: 'Unauthorized user',
          code: 401,
      })
  };
};

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
router.post("/create-payment-intent", async (req, res) => {
  const {items} = req.body
  const {courseId, userId} = req.body.items
  console.log(courseId, userId)
  // Create a PaymentIntent with the order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  CoursesModel.findByIdAndUpdate(courseId, {$push:{buyers:{userId}}}, {new: true} )
  
  .then((result) => {
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    
  }).catch((err) => {
    console.log('ohhhhh, it')
    next(err)
  });
});

module.exports = router;
