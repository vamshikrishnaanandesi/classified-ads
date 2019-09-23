var express = require('express');
var router = express.Router();
const config = require('../config/database');
const User = require('../models/user');
const Ads = require('../models/ads.model');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;
const HttpStatus = require('http-status-codes');
const adService = require('../services/ads.service');
const utils = require('../utils');

function upload_image(img_data) {
    console.log('here');
    utils.upload_files(img_data);
}

router.post('/post_ad', utils.upload, (req, res) => {
    let data = req.body;
    if (req.body.image) {
        data.images = upload_image(req.body.image);
        adService.createAd(data)
        .then((response) => {
            if(!response) {
                throw {
                    reason: 'failed'
                }
            }
            else {
                res.json({ status: HttpStatus.OK, msg: 'Employee registered.' });
            }
        })
        .catch((err) => {
            if (err.reason = 'failed') {
                res.json({ status: HttpStatus.INTERNAL_SERVER_ERROR, msg: err})
            }
        })
    }
})

module.exports = router;
