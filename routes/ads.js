var express = require("express");
var router = express.Router();
const config = require("../config/database");
const User = require("../models/user");
const Ads = require("../models/ads.model");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const HttpStatus = require("http-status-codes");
const adService = require("../services/ads.service");
const utils = require("../utils");
const moment = require("moment");

function upload_images(images_data) {
  let images = [];

  for (var key in images_data) {
    let fileExt = "";
    if (images_data[key].image_data.indexOf("image/png") != -1) fileExt = "png";
    else if (images_data[key].image_data.indexOf("image/jpeg") != -1)
      fileExt = "jpeg";
    else if (images_data[key].image_data.indexOf("image/jpg") != -1)
      fileExt = "jpg";
    else if (images_data[key].image_data.indexOf("video/mp4") != -1)
      fileExt = "mp4";
    else fileExt = "png";

    let imageKey = "product_images/product_img_" + moment().unix() + key;

    if (images_data[key])
      utils.uploadToS3(imageKey, fileExt, images_data[key].image_data);
    images.push({ url: imageKey + "." + fileExt });
  }

  return images;
} // Upload multiple images to s3 bucket - end

router.post("/post_ad", (req, res) => {
  let data = req.body;
  if (data.images) {
    data.images = upload_images(data.images);
  }
  adService
    .createAd(data)
    .then(response => {
      if (!response) {
        throw {
          reason: "failed"
        };
      } else {
        res.json({ status: HttpStatus.OK, msg: "Employee registered." });
      }
    })
    .catch(err => {
      if ((err.reason = "failed")) {
        res.json({ status: HttpStatus.INTERNAL_SERVER_ERROR, msg: err });
      }
    });
});

// find one product -start
router.post("/get_one_ad", (req, res) => {
  req.assert("ad_id", "ID should not be empty").notEmpty();
  req.assert("ad_id", "Incorrect ID").isLength({ min: 24, max: 24 });
  var errors = req.validationErrors();
  if (!errors) {
    let data = req.body;
    let query = { _id: objectId(data.ad_id) };
    adService
      .findOneAd(query)
      .then(response => {
        console.log(response, 'fdasf');
        if (!response) {
          throw {
            reason: "failed"
          };
        } else {
          let image_data = [];
          if (response.images.length != 0) {
            response.images.forEach(element => {
              image_data.push({
                url: utils.getPreSignedURL(element.url)
              });
            });
          }
          response.images = image_data;
          res
            .status(HttpStatus.ACCEPTED)
            .json({ success: true, msg: "Fetched", data: response });
        }
      })
      .catch(err => {
        if (err.reason == "failed") {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ success: false, msg: "Id not Found" });
        } else if (err.name === "MongoError" && err.code === 11000) {
          return res
            .status(HttpStatus.METHOD_NOT_ALLOWED)
            .json({ success: false, msg: "duplicate error", error: err });
        } else {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, msg: "Internal server error", error: err });
        }
      });
  } else {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ success: false, msg: "Required params missing", errors: errors });
  }
}); // find one product - end

module.exports = router;
