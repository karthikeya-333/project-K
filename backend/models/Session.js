const mongoose = require('mongoose');
const { Schema } = mongoose;


const SessionSchema = new Schema({
    menu:{
        type : Array,
        required:true
    },
    attendance:{
        type : Array,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    session:{
        type:Number,
        required:true
    }

   
  });
  const Session = mongoose.model('sessions', SessionSchema);
  module.exports = Session;