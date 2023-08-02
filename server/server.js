'use strict';

/*
 * Copyright (c) YESWENOV
 */
const express = require('express');
const app = express();
var cors = require('cors')
const userRoutes = require('../server/routes/user.route');

require('dotenv').config({ path: './config/config.env' });
// we'll use chalk for displaying colorful messages on the terminal
const chalk = require("chalk");

const mongoose = require('mongoose');
const stationsApp = require('./stations-app.js');

// server port number
const port = process.env.PORT;
// server hostname
const hostname = process.env.HOST;

// starting up the express (node.js) web server with STATIONS_APP
// start receiving requests and establishing connections with clients
const server = stationsApp.listen(port, hostname, (error) => {
    if (error) {
        console.error(`STATIONS_APP server startup error: ${error.message}`);
    }
    const timestamp = new Date(Date.now()).toLocaleString('en-GB', { timeZone: 'Europe/Paris' });
    console.log(
        chalk.green('STATIONS_APP server is running at'),
        chalk.blue.bold(`http://${hostname}:${port}/`),
        `| timestamp: ${timestamp}`
    );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Middleware for parsing JSON request bodies
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the server!'); 
});

/** 
app.use((req, res,next) => {
    res.status(404).send('404 not found'); 
});
*/

app.use('/users', userRoutes);


// Export the server instance to be used in other files
module.exports = server;