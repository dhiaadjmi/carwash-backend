'use strict';

/*
 * Copyright (c) YESWENOV
 */ 

const Service = require('../models/service.model');

const mongoose = require('mongoose');


var Schema = mongoose.Schema;
var service_station_Schema = new Schema({
    name: {type: String},
    phones: {
        phone1: {type: String},
        phone2: {type: String}
    },
    email: {type: String},
    photos: [{
        path: {type: String, required: true},
        order: {type: String, required: true}
        }],
    profile_photo: {type: String},
    managers: [{type: Schema.Types.ObjectId, required: true, ref: 'User'}],
    queues: [{
        name: {type: String, required: true},
        queue_schedule: {type: Schema.Types.ObjectId, ref: 'QueueSchedule'},
        service: {type: Service.schema , required: true}
    }],
    state: {type: String, enum: ['ACTIVE','INACTIVE']}},
    { timestamps : true }
     ); 



const ServiceStation = mongoose.model('ServiceStation', service_station_Schema);

module.exports = ServiceStation;