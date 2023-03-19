const mongoose = require('mongoose');

require("dotenv").config();

const mongoURI =  process.env.DB;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        
    })

    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to Mongo Successfully");
    }).catch((err)=>{console.log(err)})
}

module.exports = connectToMongo;