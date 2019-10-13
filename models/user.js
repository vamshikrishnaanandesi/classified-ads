const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema;

// User Schema
const UserSchema = mongoose.Schema ({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true, 
    index: { unique: true, dropDups: true }
  },
  password: {
    type: String,
    required: true
  },
  profile_pic:String,
  age: Number,
  gender: { type: String, enum: ['male', 'female']},
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {timestamps: true});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {email: username}
  User.findOne(query, callback);
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

module.exports.getUserByID = function(id, callback) {
  const query = {_id: id}
  return User.findById(query, callback);
}