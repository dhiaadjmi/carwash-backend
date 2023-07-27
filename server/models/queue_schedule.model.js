'use strict';

/*
 * Copyright (c) YESWENOV
 */ 

const mongoose = require('mongoose');



var Schema = mongoose.Schema;


var time_slot_Schema = new Schema({
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, required: true},
    state: {type: String, required: true,enum: [ACTIVE,INACTIVE]},
    queue_schedule: {type: Schema.Types.ObjectId, required: true, ref: 'QueueSchedule'}
    },
    {timestamps: true}); 



var queue_schedule_Schema = new Schema({
    time_slots: [{type: time_slot_Schema}]
    },
    {timestamps: true}
    ); 




const QueueSchedule = mongoose.model('QueueSchedule', queue_schedule_Schema);

module.exports = QueueSchedule;