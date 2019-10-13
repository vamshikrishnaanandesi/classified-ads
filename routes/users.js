var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
// const Employees = require('../models/employees.model');
// const userService = require('../services/user.service');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;
const HttpStatus = require('http-status-codes');
// const Location = mongoose.model('Location');
const moment = require("moment");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Register
router.post('/register', async(req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender
  });

  User.addUser(newUser, (err, user) => {
    console.log(err)
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {

      res.json({ success: true, msg: 'User registered' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {

  const username = req.body.email;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    // if (!user) {
    //   // return res.json({success: false, msg: 'User not found'});
    //   Employees.getUserByUsername(username, (err, employee) => {
    //     if (err) throw err;
    //     if (!employee) {
    //       return res.json({ success: false, msg: 'User not found' });
    //     }

    //     Employees.comparePassword(password, employee.password, (err, isMatch) => {
    //       if (err) throw err;
    //       if (isMatch) {
    //         const token = jwt.sign({ data: employee }, config.secret, {
    //           expiresIn: 604800 // 1 week
    //         });
    //         let p_image;
    //         if(employee.profile_pic){
    //           p_image = utils.getPreSignedURL(employee.profile_pic)
    //         }
    //         res.json({
    //           success: true,
    //           token: 'JWT ' + token,
    //           user: {
    //             id: employee._id,
    //             username: employee.username,
    //             manager_id: employee.manager_id,
    //             profile_pic : p_image,
    //             location: employee.availability_location,
    //             email: employee.email,
    //             role: "employee"
    //           }
    //         })
    //       } else {
    //         return res.json({ success: false, msg: 'Wrong password' });
    //       }
    //     });
    //   });
    // }
    else {
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({ data: user }, config.secret, {
            expiresIn: 604800 // 1 week
          });
          let p_image;
            if(user.profile_pic){
              p_image = utils.getPreSignedURL(user.profile_pic)
            }
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              age: user.age,
              gender: user.gender,
              role: user.role
            }
          })
        } else {
          return res.json({ success: false, msg: 'Wrong password' });
        }
      });
    }
  });

});

router.post('/get_user_by_id', (req, res) => {
  let data = req.body;
  User.getUserByID(data.user_id)
  .then(response => {
    console.log(response);
    if (!response) {
      throw {
        reason: "failed"
      };
    }
    else {
      res
        .status(HttpStatus.ACCEPTED)
        .json({ success: true, msg: "Fetched", data: response });
    }
  })
})

module.exports = router;
