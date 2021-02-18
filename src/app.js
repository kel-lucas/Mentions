const bodyParser = require('body-parser');
const express = require ('express');
const mongoose = require ('mongoose');
require('dotenv').config();
// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('connected', ()=>{
  console.log('Mongoose default connection is open');
});

db.on('error', err=>{
  console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', ()=>{
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', ()=>{
  db.close(()=>{
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    );
    process.exit(0);
  });
  
});

mongoose.connect(process.env.DATABASE_CONNECTION_STRING,{
  useUnifiedTopology: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

// Load models
const Mentions = require('./models/mentions');


// Load Routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);


const mentionsRoutes = require('./routes/mentions-routes');
app.use(bodyParser.json());
app.use('/mentions', mentionsRoutes);


module.exports = app;
