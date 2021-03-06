const express = require("express");
const router = express.Router();

//we installed bcrypt.js
const bcrypt = require("bcryptjs");

const UserModel = require("../models/User.model");

//Middlewares
const isLoggedIn = (req, res, next) => {
  
  if (req.session.loggedInUser) {
    //calls whatever is to be executed after the isLoggedIn function is over
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

const isAdmin = (req, res, next) => {
  
  if (req.session.loggedInUser.role != 'student') {
    //calls whatever is to be executed after the isLoggedIn function is over
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

//-----Registration Route -----//

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // -----SERVER SIDE VALIDATION ----------

  if (!username || !email || !password) {
    res.status(500).json({
      errorMessage: "Please enter username, email and password",
    });
    return;
  }
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).json({
      errorMessage: "Email format not correct",
    });
    return;
  }
  const myPassRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  );
  if (!myPassRegex.test(password)) {
    res.status(500).json({
      errorMessage:
        "Password needs to have 8 characters, a number and an Uppercase alphabet",
    });
    return;
  }

  // NOTE: We have used the Sync methods here creating a salt
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  UserModel.create({ username, email, passwordHash: hash })
    .then((user) => {
      // ensuring that we don't share the hash as well with the user

      req.session.loggedInUser = user;
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(500).json({
          errorMessage: "username or email entered already exists!",
          message: err,
        });
      } else {
        res.status(500).json({
          errorMessage: "Something went wrong! Go to sleep!",
          message: err,
        });
      }
    });
});
//------Sign In Route-----//

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // -----SERVER SIDE VALIDATION ----------

  if (!email || !password) {
    res.status(500).json({
      error: "Please enter E-mail and password",
    });
    return;
  }

  // Find if the user exists in the database
  UserModel.findOne({ email })
    .then((userData) => {
      bcrypt
        .compare(password, userData.passwordHash)
        .then((doesItMatch) => {
          //if it matches
          if (doesItMatch) {
            // req.session is the special object that is available to you
            req.session.loggedInUser = userData;
            res.status(200).json(userData);
          }
          //if passwords do not match
          else {
            res.status(500).json({
              error: "Invalid Password",
            });
            return;
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: "Email format not correct",
          });
          return;
        });
    })

    //throw an error if the user does not exists
    .catch((err) => {
      res.status(500).json({
        error: "Email does not exist",
        message: err,
      });
      return;
    });
});

//------Settings patch route ----//
router.patch('/settings', isLoggedIn, (req, res, next) => {
  let { username, email, password } = req.body
  if(username == '') {
    username = req.session.loggedInUser.username
  }

  if(email == ''){
    email = req.session.loggedInUser.email
  }

  if(password == ''){
    password = req.session.loggedInUser.passwordHash
  }
  else{
    const passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!passRe.test(password)) {
      res.status(500).json({
        errorMessage:
          "Password needs to have 8 characters, a number and an Uppercase alphabet",
      });
      return;
    }
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    password = hash
  }

  UserModel.findByIdAndUpdate(req.session.loggedInUser._id,{ username, email, passwordHash: password},{new: true})
    .then((result) => {
      req.session.loggedInUser = result
    res.status(200).json(result)
    }).catch((err) => {
      next(err)
    });

})



// will handle all POST requests to http:localhost:5005/api/logout
router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy();
  // Nothing to send back to the user
  res.status(204).json({});
});

// Route to fetch user and store in Session

router.get("/user", isLoggedIn, (req, res, next) => {
  
  res.status(200).json(req.session.loggedInUser);
});

//Route to patch your user's profilePic
router.patch('/user', isLoggedIn, (req,res,next)=>{
  const {image} = req.body.img
  const {_id} = req.session.loggedInUser
  
  UserModel.findByIdAndUpdate(_id, {image}, {new:true})
  .then((result) => {
    req.session.loggedInUser = result
    res.status(200).json(result)
  }).catch((err) => {
    next(err)
  });
})

//Route to ADD portfolio property to your UserModel.
  router.patch('/user/portfolio', isLoggedIn, isAdmin, (req,res,next)=>{
    const portfolioId = req.body.portfolio.data._id
    const {_id} = req.session.loggedInUser
    
    UserModel.findByIdAndUpdate(_id, {portfolio: portfolioId}, {new:true})
    .then((result) => {
      req.session.loggedInUser = result
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err)
    });

})


module.exports = router;
