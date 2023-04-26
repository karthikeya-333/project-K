
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

//new Array(days).fill(0).map(() => new Array(3).fill(0));
router.post("/success", async (req, res) => {
  try {
    let {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      endDate, startDate, authToken
    } = req.body;
    

    let diffInTime =  new Date(endDate).getTime() - new Date(startDate).getTime();
    let days  = diffInTime / (1000 * 3600 * 24)  +1;
    let now = new Date(endDate).getTime();
    endDate =  new Date(now - (now % 86400000) + 86400000-1);
    // let attendance= [];
    // for(var i=0;i<days;i++){
    //   attendance.push(["NO","NO","NO"]);
    // }
    let amount=days*100;

    const shasum = crypto.createHmac("sha256", process.env.KEY_SECRET);
    
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    if (!authToken) {
      res.status(401).send({ error: "Please authenticate using a valid token 1" })
    }
    const data = jwt.verify(authToken, process.env.JWT_SECRET);
    //console.log(attendance);
    const newTransaction = new Transaction({
      startDate, paymentID:razorpayPaymentId, orderID:razorpayOrderId, Date: new Date(), endDate, amount, user: data.user.id
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
