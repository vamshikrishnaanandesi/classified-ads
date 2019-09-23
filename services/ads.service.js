const mongoose = require('mongoose');
const Ads = mongoose.model('ads');

const createAd = (data) => {
    return Ads.create(data);
}

module.exports = {
    createAd
}