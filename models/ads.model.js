const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema;

const AdSchema = mongoose.Schema({
    ad_type: {
        type: String,
        required: true,
        enum: ['rent', 'lost-found', 'buy', 'sell', 'events']
    },
    title: {
        type: String,
        required: true
    },
    contact_details: {
        type: String,
        required: true
    },
    images: [{
        url: String
    }],
    price: Number,
    posted_by: {
        type: Schema.Types.ObjectId,
        required: true
    },
    category: {
        type: String,
        enum: ['electronics', 'books', 'jewellery', 'vehicles', 'misc']
    },
    status: {
        type: String,
        enum: ['active', 'claimed', 'reported'],
        default: 'active'
    },
    user_type: {
        type: String,
        enum: ['admin', 'user']
    }
}, { timestamps: true })

mongoose.exports = mongoose.model('ads', AdSchema);