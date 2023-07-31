'use strict';

/*
 * Copyright (c) YESWENOV
 */ 

const mongoose = require('mongoose');


var Schema = mongoose.Schema;
var service_Schema = new Schema({
    name: {type: String, required: true},
    state: {type: String, required: true},
    is_carwash: {type: Boolean, required: true}
    },
    { timestamps : { createdAt: 'created_at' } }
     ); 


const Service = mongoose.model('Service', service_Schema);

module.exports = Service;