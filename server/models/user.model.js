'use strict';

/*
 * Copyright (c) YESWENOV
 */ 

const mongoose = require('mongoose');

// validator: a library of string validators and sanitizers
const { isEmail } = require('validator');

var Schema = mongoose.Schema;
var user_Schema = new Schema({
    name: {type: String},
    date_of_birth: {type: Date},
    address: {
        street: {type: String, required: true},
        country: {type: String, required: true},
        city: {type: String, required: true},
        postal_code: {type: String, required: true}},
    phone: {type: String},
    profile_photo: {type: String},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address.']
        },
    password: {type: String, required: true}
    }, 
    { timestamps : { createdAt: 'created_at' } }
    ); 

// Compile User model from user_Schema definition
const User = mongoose.model('User', user_Schema);

module.exports = User;