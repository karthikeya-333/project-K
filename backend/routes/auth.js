const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const nodemailer = require('nodemailer');
//var session = require('express-session');
const JWT_SECRET = process.env.JWT_SECRET;
const Transaction = require("../models/Transaction");



router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      role: "user"
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken, "role": "user" })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }


    const data = {
      user: {
        id: user.id
      }
    }
    success = true;
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success, authtoken, "role": user.role })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});

router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/send-otp", async (req, res) => {
  try {
    const { email, purpose } = req.body;
    if (purpose === "forgot") {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send({ success: false, message: 'Failed to send OTP' });
      } else {
        req.session.otp = otp;
        console.log(req.session.otp)
        res.send({ success: true, otp, message: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});


router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(req.session.otp)
    if (otp === req.session.otp) {
      req.session.user = { email, verified: true };
      console.log(req.session.user)
      res.send({ success: true, message: 'OTP verified successfully' });
    } else {
      res.send({ success: false, message: 'Invalid OTP' });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});

router.post("/changepassword", async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(req.session.user)
    // if (email != req.session.user.email) {
    //   return res.status(400).json({ error: "User not verified" });
    // }
    let user = await User.findOne({ email: email });
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    let updatedUser = await User.findOneAndUpdate({ email: email }, { password: secPass });

    const data = {
      user: {
        id: updatedUser.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    //console.log(success)

    // res.json(user)
    res.json({ success, authtoken, "role": "user" })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/verify-user", async function (req, res) {
  try {
    let token = req.body.code.slice(0, 160);
    let session = req.body.code[req.body.code.length - 1];

    if (!token) {
      res.status(401).send({ error: "Invalid" })
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    let user = data.user;
    let transactions = await Transaction.find(user);
    //console.log(transactions)
    let recentTransaction1 = transactions[transactions.length - 1];
    let recentTransaction2 = transactions[transactions.length - 2];
    let valid = false;
    let today = new Date();
    if (recentTransaction1) {
      let t1 = recentTransaction1.startDate;
      let t2 = recentTransaction1.endDate;
      t1 = new Date(t1);
      t2 = new Date(t2);
      if (t1.getTime() <= today.getTime() && t2.getTime() >= today.getTime()) {
        valid =true;
      }
    }
     if (recentTransaction2) {
      let t3 = recentTransaction2.startDate;
      let t4 = recentTransaction2.endDate;
      t3 = new Date(t3);
      t4 = new Date(t4);
      if (t3.getTime() <= today.getTime() && t4.getTime() >= today.getTime()) {
        valid=true;
      }
    }
    res.send(valid)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});

module.exports = router;

