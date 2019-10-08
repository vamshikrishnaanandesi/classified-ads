const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema;

const reportedAdSchema = mongoose.Schema({
    ad_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    reported_by: {
        type: Schema.Types.ObjectId
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

mongoose.exports = mongoose.model('reported_ads', reportedAdSchema);