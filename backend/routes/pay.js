
const Razorpay = require('razorpay');
const router = require('express').Router();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
  const payment_amount = req.body.amount;

  const options = {
    amount: payment_amount * 100,
    currency: 'INR',
    receipt: 'receipt_order_1',
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response)
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not create payment order');
  }
});

module.exports = router;
