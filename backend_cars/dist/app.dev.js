"use strict";

// Create a restful API in express
// Can also use Postman to make an HTTP Post request
//to add additional items to the list of cars.
require('dotenv').config();

var express = require("express");

var bodyParser = require("body-parser");

var cors = require('cors');

var app = express(); // let cars = require("./src/cars.json.js");

var carController = require('./controllers/cars.controllers.js');

var mongoose = require('mongoose'); // app.use(express.static("public"));


app.use(bodyParser.json());
app.use(cors()); // gets all cars in database

app.get("/", carController.findAll); // User can add cars.

app.post("/", carController.create); // User can delete items using the specific ID.

app["delete"]("/:resourceId", carController.deletecarsById); // User can use "patch" to edit the details about a specific car (using ID)

app.patch("/:resourceId", carController.updateByOwner);
app.get("*", function (req, res, next) {
  var err = new Error("Sorry! Can't find that resource. Please check your URL. ");
  err.statusCode = 404;
  next(err);
}); // Linking to MongoDB 

var uri = process.env.MONGO_URI;
mongoose.Promise = global.Promise; // Deprecation warning of current server discovery and monitoring engine

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection.on('error', function () {
  console.log('Connection to Mongo established.');
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});
mongoose.connection.once('open', function () {
  console.log("Successfully connected to the database");
});
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log("Server is listening on port ".concat(PORT));
}); // if (process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname,'frontend_cars/build')));
//     app.get('*',(req,res)=>{res.sendFile(path.resolve(__dirname,'frontend_cars','build','index.html'));
//     });
// }