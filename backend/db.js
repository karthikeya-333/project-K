const mongoose = require('mongoose');

require("dotenv").config();

const mongoURI =  "mongodb://localhost:27017/mms";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        
    })

    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to Mongo Successfully");
    }).catch((err)=>{console.log(err)})
}

module.exports = connectToMongo;