const router = require("express").Router();

const stripe = require("stripe")("sk_test_51IpuIuH5gcnIJLr7b6pYLrYKESswGsgBcXT5yY3kkCvbwymLHcxYMbnZTxGoXdBLlFrydwKbHZMgia41FuoqFUzj000sMI9iPy");

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

module.exports = router;
