const mongoose = require('mongoose');
const { Schema } = mongoose;

// const today = new Date();
// todayDate = String(today.getDate()) +"/"+ String(today.getMonth()+1) +"/"+ String(today.getFullYear())


const TransactionSchema = new Schema({
    paymentID:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    time:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
   
  });
  const Transaction = mongoose.model('transactions', TransactionSchema);
  module.exports = Transaction;