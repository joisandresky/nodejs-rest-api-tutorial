const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/todos');

mongoose.connection.on('connected', function () {
  console.log("DATABASE CONNECTED");
});

mongoose.connection.on('error', function (err) {
  console.log('ERROR TO CONNECT DB', err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

app.listen("3000", function () {
  console.log('SERVER RUNNING ON PORT 3000, OKE');
})