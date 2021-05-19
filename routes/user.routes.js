const express = require('express')
const router = express.Router()

const UserModel = require('../models/User.model')


//Middlewares
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

const isOwner = (req, res, next) => {  
  if (req.session.loggedInUser.role === 'owner') {
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

//Routes for Listing all users
router.get("/users",isLoggedIn, (req, res, next) => {
  
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

//Route for OWNER to change ROLE from student to MENTOR
router.patch('/users/:userId', isLoggedIn, isOwner, (req, res, next)=>{
  const newRole = req.body
  const {userId} = req.params
  
  UserModel.findByIdAndUpdate(userId, newRole ,{new:true})
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json({
      error: 'No Users found',
      message: err
    })
  });
})


module.exports = router;