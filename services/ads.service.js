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

const getAdsByType = query => {
    return Ads.find(query).exec();
}
module.exports = {
  createAd,
  findOneAd,
  findTopPicks,
  getAdsByType
};
