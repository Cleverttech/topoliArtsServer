const express = require('express')
const router = express.Router()

const UserModel = require('../models/User.model')

const isLoggedIn = (req, res, next) => {  
  if (req.session.loggedInUser) {
      //calls whatever is to be executed after the isLoggedIn function is over
      next()
  }
  else {
      res.status(401).json({
          message: 'Unauthorized user',
          code: 401,
      })
  };
  };

router.get("/users", isLoggedIn, (req, res, next) => {
  UserModel.find()
  .then((result) => {
     res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json({
      error: 'No Users found',
      message: err
    })
  });
});

module.exports = router;