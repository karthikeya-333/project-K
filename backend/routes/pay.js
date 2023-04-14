
const Razorpay = require('razorpay');
const router = require('express').Router();
const Transaction = require("../models/Transaction");
const crypto = require("crypto");
var jwt = require('jsonwebtoken');

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
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not create payment order');
  }
});


router.post("/success", async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      endDate, startDate, authToken
    } = req.body;

    const shasum = crypto.createHmac("sha256", process.env.KEY_SECRET);
    
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    if (!authToken) {
      res.status(401).send({ error: "Please authenticate using a valid token 1" })
    }
    const data = jwt.verify(authToken, process.env.JWT_SECRET);
    const newTransaction = new Transaction({
      startDate, paymentID:razorpayPaymentId, orderID:razorpayOrderId, Date: new Date(), endDate, amount:100, user: data.user.id
    })
    const savedTransaction = await newTransaction.save();
    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

});




module.exports = router;
