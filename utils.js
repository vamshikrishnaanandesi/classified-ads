var express = require("express");
var router = express.Router();
var multer = require("multer");
var AWS = require("aws-sdk");

AWS.config.loadFromPath('s3_credentials.json');
const BucketName = "the-cdu-projects";
const s3Bucket = new AWS.S3({ params: { Bucket: BucketName } });

const uploadToS3 = (fileName, fileExt, fileData, isCampaign, callback) => {
  let data = new Buffer(fileData.replace("data:image\/" + fileExt + ";base64,", ""), "base64")
  console.log(data, 'notif_data');
  var uploadabledata = {
      ACL: 'public-read',
      Key: fileName + '.' + fileExt,
      Body: data,
      ContentType: 'image/' + fileExt
  };
  s3Bucket.putObject(uploadabledata, function(err, response) {
      if (err) {
          console.log('Error in uploading', err);
      } else {
          console.log("uploaded: ", fileName+"."+fileExt);
          if(isCampaign)
              callback(response);

      }
  });
};

const getPreSignedURL = (awsFileKey) => {
  let s3 = new AWS.S3();
  let params = {
      Bucket: BucketName,
      Key: awsFileKey
  };
  try {
      let url = s3.getSignedUrl('getObject', params);
      return url;
      
  } catch (err) {

      return "";
      
  }
}

module.exports = {
  uploadToS3,
  getPreSignedURL
}
