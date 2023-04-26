const mongoose = require('mongoose');
const { Schema } = mongoose;


let attendance = [];
for (var i = 0; i < 30; i++) {
    attendance.push([0, 0, 0]);
}


const TransactionSchema = new Schema({
    paymentID: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Date: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    attendance: {
        type: Array,
        default : attendance,
        required: true
    }

});
const Transaction = mongoose.model('transactions', TransactionSchema);
module.exports = Transaction;