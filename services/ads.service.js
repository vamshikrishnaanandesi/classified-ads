const mongoose = require("mongoose");
const Ads = mongoose.model("ads");
const reportedAds = mongoose.model("reported_ads");

const createAd = data => {
  return Ads.create(data);
};

const findOneAd = query => {
  return Ads.findById(query).exec();
};

const findTopPicks = () => {
  return Ads.find({}, {}, { sort: { 'createdAt' : -1 } }).exec();
};

const getAdsByType = query => {
    return Ads.find(query).exec();
}

const reportAd = query => {
  return reportedAds.create(query);
}

const updateAd = query => {
  return reportedAds.findByIdAndUpdate(query.ad_id, {$set: {status: 'reported'}}, {new: true}).exec();
}

const deleteAd = query => {
  return Ads.findByIdAndDelete({_id: query}).exec();
}

module.exports = {
  createAd,
  findOneAd,
  findTopPicks,
  getAdsByType,
  reportAd,
  updateAd,
  deleteAd
};
