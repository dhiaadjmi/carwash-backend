'use strict';

/*
 * Copyright (c) YESWENOV
 */

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



