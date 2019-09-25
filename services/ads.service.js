const mongoose = require('mongoose');
const Ads = mongoose.model('ads');

const createAd = (data) => {
    return Ads.create(data);
}

const findOneAd = (query) =>{
    return Ads.findById(query).exec();
  }

module.exports = {
    createAd,
    findOneAd
}