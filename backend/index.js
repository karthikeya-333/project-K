const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors') ;
var session = require('express-session');


connectToMongo();
const app = express()
const port = 5000

app.use(express.json());
app.use(cors())
app.use(express.json());
 
app.use(session({
  secret: 'hemlo',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hour
}));

// Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/transaction', require('./routes/transaction'));
app.use('/api/pay', require('./routes/pay'));




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})