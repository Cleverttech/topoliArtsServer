const express = require("express");
const router = express.Router();

const CoursesModel = require("../models/Courses.model");

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

//Only Admin 
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

router.get("/courses", (req, res, next) => {
  CoursesModel.find()
    .populate("mentor")
    .populate("buyers.userId")
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((err) => {
      res.status(500).json({
        error: "No courses found",
        message: err,
      });
    });
});

router.post("/courses/create", isLoggedIn, isAdmin, (req, res) => {
  const { name, description, price, image } = req.body;
  const mentor = req.session.loggedInUser._id;
  console.log(mentor);

  CoursesModel.create({ mentor, name, description, price, image })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});


router.patch("/courses/:courseId", isLoggedIn, (req, res) => {
  const courseForm = req.body
  const {id} = req.params.courseId
  CoursesModel.findById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

router.delete("/courses/:courseId", isLoggedIn, isAdmin, (req, res) => {
  CoursesModel.findByIdAndDelete(req.params.courseId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});


// router.post('/courses/:courseid/payment', (req,res)=>{
//   const {fullname,countrycode, email, telephone, message} = req.body

//   MessageModel.create({fullname,countrycode, email, telephone, message})
//   .then((response) => {
//     res.status(200).json(response)
//   })
//   .catch((err) => {
//     res.status(500).json({
//          error: 'Something went wrong',
//          message: err
//     })
//   })
// })

module.exports = router;