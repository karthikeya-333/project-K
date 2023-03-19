const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Transaction = require("../models/Transaction");
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');



router.post("/addTransaction",fetchuser,async(req,res)=>{
    try {

        const {  startDate, endDate, success ,amount,paymentID,time} = req.body;

        if(success){
            const newTransaction = new Transaction({
                startDate,paymentID,time,endDate,amount,user:req.user.id
            })
            const savedTransaction = await newTransaction.save();
            const user = await User.findById(req.user.id);
            let newtransactions = user.transactions;
            newtransactions.push(savedTransaction);
            let recent =await User.updateOne({_id:req.user.id},{transactions:newtransactions})
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

        let user = await User.findById(req.user.id)
        //console.log(user);
        if (user.role != "admin") {
            return res.status(401).send("Not Allowed");
        }
        //const user = await Transaction.find({user:req.user.id});
        //console.log(orders)
        res.send({"transactions":user.transactions});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router