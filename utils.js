var express = require("express");
var router = express.Router();
var multer = require("multer");
var AWS = require("aws-sdk");

var storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, "");
  }
});
var multipleUpload = multer({ storage: storage }).array("file");
var upload = multer({ storage: storage }).single("images");

const BUCKET_NAME = "the-cdu-project";
const IAM_USER_KEY = "AKIAJD5DS5AL4AQ7UYSQ";
const IAM_USER_SECRET = "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";

function upload_files(data) {
    console.log(data,'here');
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });

  s3bucket.createBucket(function() {
    let Bucket_Path = "BUCKET_PATH";
    //Where you want to store your file
    var ResponseData = [];
      var params = {
        Bucket: BucketPath,
        Key: item.originalname,
        Body: item.buffer,
        ACL: "public-read"
      };
      s3bucket.upload(params, function(err, data) {
        if (err) {
          res.json({ error: true, Message: err });
        } else {
          ResponseData.push(data);
          if (ResponseData.length == file.length) {
            return ResponseData;
          }
        }
      });
  });
}

module.exports = {
    upload_files,
    multipleUpload,
    upload
}
