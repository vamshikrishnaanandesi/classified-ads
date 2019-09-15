
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;


const AdminSchema = new Schema ({
    email: {
      type: String,
      required: true, 
      index: { unique: true, dropDups: true }
    },
    password: {
      type: String,
      required: true
    }
  }, {timestamps: true});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getUserById = function(id, callback) {
  Admin.findById(id, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      console.log(err);
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}