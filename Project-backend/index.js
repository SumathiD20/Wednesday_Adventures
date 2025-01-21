//require('newrelic');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

dotenv.config({ path: './config.env' });
//const PORT = process.env.PORT || 3000;

// MongoDB connection
require('./db/connection');

//app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(bodyParser.json());





app.get('/', (req, res) => {
  res.send('Welcome to Wednesdays Wicked Adventures theme park!');
});