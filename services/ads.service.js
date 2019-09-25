const mongoose = require("mongoose");
const Ads = mongoose.model("ads");

const createAd = data => {
  return Ads.create(data);
};

const findOneAd = query => {
  return Ads.findById(query).exec();
};

const findTopPicks = () => {
  return Ads.aggregate([
    {
      $sample: { size: 2 }
    }
  ]);
};

module.exports = {
  createAd,
  findOneAd,
  findTopPicks
};
