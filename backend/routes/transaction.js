const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Transaction = require("../models/Transaction");
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');



router.post("/addTransaction",fetchuser,async(req,res)=>{
    try {
        const {startDate,endDate,success,amount,paymentID,orderID,Date} = req.body;
        if(success){
            const newTransaction = new Transaction({
                startDate,paymentID,orderID,Date,endDate,amount,user:req.user.id
            })
            const savedTransaction = await newTransaction.save();
            res.send(savedTransaction);
        }
        
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/getTransactions",fetchuser,async(req,res)=>{
    try {

       const transactions = await Transaction.find({user : req.user.id});
       res.send({"transactions":transactions});

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/getAllTransactions",fetchuser,async(req,res)=>{
    try {

        // let user = await User.findById(req.user.id)
        // //console.log(user);
        // if (user.role != "admin") {
        //     return res.status(401).send("Not Allowed");
        // }
        let transactions = await Transaction.find();
        res.send({transactions});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router