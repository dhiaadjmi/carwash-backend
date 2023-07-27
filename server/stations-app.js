"use strict";

/*
 * Copyright (c) YESWENOV
 */

require("dotenv").config({ path: "./config/config.env" });
// express is a minimal and flexible web application framework for Node.js
const express = require("express");
// Mongoose is a MongoDB object data modeling tool designed to work in an asynchronous environment
const mongoose = require("mongoose");
// we'll use chalk for displaying colorful messages on the terminal
const chalk = require("chalk");
const User = require("./models/user.model");





// Initialize STATIONS_App: express application
const stationsApp = express();




// Stations_App_DB connection string
const db_uri = process.env.STATIONS_DB_ATLAS_URI;


// connecting Stations_App to Stations_App_DB (MongoDB Atlas Cluster)
mongoose
  .connect(db_uri, { family: 4 })
  .then((conn) => {
    console.log(
      chalk.yellow("STATIONS_APP connected successfully to STATION_APP_DB at"),
      chalk.blue.bold(`${conn.connection.host}`),
      "\n"
    );
  })
  .catch((error) =>
    console.error(`STATION_APP_DB connection error: ${error.message}`)
  );

mongoose.connection.on("error", () => {
  console.error.bind(console, "STATION_APP_DB connection error: ");
});


//-------------------------------------
//ToDo: ToDelete (Just for test)
const user = new User();
user.name= "Ali10";  
user.password= "xxxxxx";
user.email= "a@a.com";
user.address= {street:"1 rue a...", city:"Mahdia", country:"Tunisie", postal_code:"5100"};
user.phone = "123456";  
user.date_of_birth= Date.now();
user.save();
//-------------------------------------



// CommonJS module
module.exports = stationsApp;